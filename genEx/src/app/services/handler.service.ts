import { Type, Injectable } from '@angular/core';
import { OpenAI } from 'openai';
import { users } from './userData';
import { Subject } from 'rxjs';
import * as hackathon_keys from "c:/shared/content/config/api-keys/hackathon_openai_keys.json";
import { RetirementContributionSliderComponent } from '../components/retirement-contribution-slider/retirement-contribution-slider.component';
import { AccountBalanceComponent } from '../components/account-balance/account-balance.component'
import { YourIraComponent } from 'components/your-ira/your-ira.component';


const OPEN_AI_KEY = hackathon_keys["team_9"]

const openai = new OpenAI({
    apiKey: OPEN_AI_KEY,
    dangerouslyAllowBrowser: true
});

interface userData {
    id: number,
    name: string,
    income: number,
    totalContribution: number,
    companyMatch: number,
    iraAccount: number,
    iraBalance: number,
    iraContributionsThisYear: number,
    accountBalance: number
}

@Injectable({
    providedIn: 'root',
})
export class HandlerService {
    constructor() {
    }

    current_userID = 0;
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = []
    componentToRender: {component: Type<any>, inputs: Record<any, any>}[]= [];

    toolsToCall: OpenAI.Chat.Completions.ChatCompletionTool[] = [
        {
            function: {
                name: "display_401k_components",
                description: "Displays an interactive web component with a users 401(k) contribution percentage and 401(k) employer match",
                parameters: {
                    type: "object",
                    properties: {},
                    required: []
                },
            },
            type: "function"
        },
        {
            function: {
                name: "display_IRA_components",
                description: "Displays an interactive web component for a User to view their IRA balance and contribute to it",
                parameters: {
                    type: "object",
                    properties: {},
                    required: []
                }
            },
            type: "function"
        },
        {
            function: {
                name: "display_Balance_components",
                description: "Displays an interactive web component for a User to view their account balance",
                parameters: {
                    type: "object",
                    properties: {},
                    required: []
                }
            },
            type: "function"
        }
    ];

    async postUserRequest(message:string, userId:number) {
        this.current_userID = userId;
        let tempMessage = `A user is asking ${message}. Respond normally unless there is an interactive component to display.`
        this.messages.push({ role: "user", content: tempMessage});
        return await this.formatOpenAIPromt(this.messages);
    }

    getUserDetails(uid: number) {
        return users[uid] as userData;
    }

    displayBalanceComponent() {
        const details = this.getUserDetails(this.current_userID)
        const resStr = `${details.name} has an account balance of ${details.accountBalance}`;
        this.componentToRender.push({component: AccountBalanceComponent, inputs: { totalContribution: details.totalContribution, companyMatch: details.companyMatch, income: details.income}});
        return resStr;
    }

    display401kComponent() {
        const details = this.getUserDetails(this.current_userID)
        const resStr = `${details.name} contributes ${details.totalContribution}% of their salary to their 401k, their employer will match up to ${details.companyMatch}%`;
        this.componentToRender.push({component: RetirementContributionSliderComponent, inputs: { totalContribution: details.totalContribution, companyMatch: details.companyMatch, income: details.income}});
        return resStr;
    }

    displayIraComponents() {
        const details = this.getUserDetails(this.current_userID);
        const resStr = `${details.name} has an IRA Balance of ${details.iraBalance} in the account ${details.iraAccount}. So far this year ${details.name} has contributed ${details.iraContributionsThisYear} dollars to their IRA.`
        this.componentToRender.push({component: YourIraComponent, inputs: {name: details.name, iraAccount: details.iraAccount, iraBalance: details.iraBalance, iraContributionsThisYear: details.iraContributionsThisYear}});
        return resStr;
    }

    getComponentsToRender() {
        return this.componentToRender;
    }

    // ACTUALLY CALLING OPEN AI
    async formatOpenAIPromt(userMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam[]) {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: userMessage,
            tools: this.toolsToCall,
            tool_choice: "auto", // auto is default, but we'll be explicit
        });
        const responseMessage = response.choices[0].message;

        // Step 2: check if the model wanted to call a function
        const toolCalls = responseMessage.tool_calls;
        if (toolCalls) {
            // Step 3: call the function
            // Note: the JSON response may not always be valid; be sure to handle errors
            const availableFunctions: any = {
                'display_401k_components' : this.display401kComponent.bind(this),
                'display_IRA_components' : this.displayIraComponents.bind(this),
                'display_Balance_components' : this.displayBalanceComponent.bind(this)
            }; // only one function in this example, but you can have multiple
            this.messages.push(responseMessage); // extend conversation with assistant's reply
            for (const toolCall of toolCalls) {
                const functionName: string = toolCall.function.name;
                const functionToCall = availableFunctions[functionName];
                const functionArgs = JSON.parse(toolCall.function.arguments);
                const functionResponse = functionToCall(functionArgs);
                this.messages.push({
                    tool_call_id: toolCall.id,
                    role: "tool",
                    content: functionResponse,
                }); // extend conversation with function response
            }
            const secondResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-0125",
                messages: this.messages,
            }); // get a new response from the model where it can see the function response
            return secondResponse.choices;
        } else {
            return responseMessage.content;
        }
    }
}