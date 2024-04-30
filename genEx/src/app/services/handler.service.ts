import { Type, Injectable } from '@angular/core';
import { OpenAI } from 'openai';
import { users } from './userData';
import * as hackathon_keys from "c:/shared/content/config/api-keys/hackathon_openai_keys.json";
import { RetirementContributionSliderComponent } from '../components/retirement-contribution-slider/retirement-contribution-slider.component';


const OPEN_AI_KEY = hackathon_keys["team_9"]

const openai = new OpenAI({
    apiKey: OPEN_AI_KEY,
    dangerouslyAllowBrowser: true
});

interface user401kData {
    id: number,
    name: string,
    contribution_percentage: number,
    employer_match: number
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
                    properties: {
                        // name: {
                        //     type: "string",
                        //     description: "The users name"
                        // },
                        // contribution_percentage: {
                        //     type: "number",
                        //     description: "The users 401(k) contribution percentage"
                        // },
                        // employer_match: {
                        //     type: "number",
                        //     description: "The users 401(k) employer match"
                        // }
                    },
                    required: [],
                },
            },
            type: "function"
        },
    ];

    async postUserRequest(message:string, userId:number) {
        this.messages.push({ role: "user", content: message});
        this.current_userID = userId;
        return await this.formatOpenAIPromt(this.messages);
    }

    getUser401kDetails(uid: number) {
        let thisUser: user401kData = users[uid] as user401kData;
        return [thisUser.name, thisUser.contribution_percentage, thisUser.employer_match];
    }

    display401kComponent() {
        const details = this.getUser401kDetails(this.current_userID)
        console.log(`${details[0]} contributes ${details[1]}% of their salary to their 401k, their employer will match up to ${details[2]}%`);
        this.componentToRender.push({component: RetirementContributionSliderComponent, inputs: { totalContribution: details[1], companyMatch: details[2], income: 100000}});
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
                'display_401k_components' : this.display401kComponent(),
            }; // only one function in this example, but you can have multiple
            this.messages.push(responseMessage); // extend conversation with assistant's reply
            for (const toolCall of toolCalls) {
                const functionName: string = toolCall.function.name;
                console.log(`Function name ${functionName}`)
                const functionToCall = availableFunctions[functionName];
                console.log(`Function to call ${functionToCall}`)
                const functionArgs = JSON.parse(toolCall.function.arguments);
                const functionResponse = functionToCall();
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
            console.log(secondResponse.choices[0].message.content);
            return secondResponse.choices;
        } else {
            return "NOT WORKING";
        }
    }
}