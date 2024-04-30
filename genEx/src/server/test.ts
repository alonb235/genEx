import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import ChatCompletionCreateParamsBase from 'openai';
import ChatCompletionTool from 'openai';
import * as hacakthon_keys from "c:/shared/content/config/api-keys/hackathon_openai_keys.json"
import * as userData from '../data/users.json'

interface user401kData {
    id: number,
    name: string,
    contribution_percentage: number,
    employer_match: number
}


const OPEN_AI_KEY = hacakthon_keys["team_9"]

const openai = new OpenAI({
    apiKey: OPEN_AI_KEY
});

class HandlerService {
    constructor() {}

    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: "user", content: "A user is asking what their 401(k) contribution percentage is and what their employer will match. As a response please display an interactive web component for the user" },
    ];

    toolsToCall: OpenAI.Chat.Completions.ChatCompletionTool[] = [
        {
            function: {
                name: "get_current_weather",
                description: "Get the current weather in a given location",
                parameters: {
                    type: "object",
                    properties: {
                        location: {
                            type: "string",
                            description: "The city and state, e.g. San Francisco, CA",
                        },
                        unit: { type: "string", enum: ["celsius", "fahrenheit"] },
                    },
                    required: ["location"],
                },
            },
            type: "function"
        },

        {
            function: {
                name: "get_user_id",
                description: "Returns a user's uid as a number"
            },
            type: "function"
        },

        {
            function: {
                name: "get_user_401k_Details",
                description: "gets a list contiaining the name, 401(k) contribution percentage, and 401(k) employer match given user's uid",
                parameters: {
                    type: "object",
                    properties: {
                        uid: {
                            type: "string",
                            description: "The id number of the user"
                        }
                    },
                    required: ["uid"],
                },
            },
            type: "function"
        },

        {
            function: {
                name: "display_401k_details",
                description: "Displays an interactive web component with a users 401(k) contribution percentage and 401(k) employer match",
                parameters: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            description: "The users name"
                        },
                        contribution_percentage: {
                            type: "number",
                            description: "The users 401(k) contribution percentage"
                        },
                        employer_match: {
                            type: "number",
                            description: "The users 401(k) employer match"
                        }
                    },
                    required: ["name", "contribution_percentage", "employer_match"],
                },
            },
            type: "function"
        },
    ];

    getUserId() {
        return 0;
    }

    getUser401kDetails(uid: number) {
        console.log(`Calling getUser401kDetails with uid: ${uid}`)
        let thisUser: user401kData = userData.users[Number(uid)] as user401kData;
        console.log(thisUser);
        return [thisUser.name, thisUser.contribution_percentage, thisUser.employer_match];
    }

    display401kComponent(name: string, contribution_percentage: number, employer_match: number) {
        console.log(`${name} contributes ${contribution_percentage}% of their salary to their 401k, their employer will match up to ${employer_match}%`);
    }

    getCurrentWeather(location: string, unit = "fahrenheit") {
        if (location.toLowerCase().includes("tokyo")) {
            return JSON.stringify({ location: "Tokyo", temperature: "10", unit: "celsius" });
        } else if (location.toLowerCase().includes("san francisco")) {
            return JSON.stringify({ location: "San Francisco", temperature: "72", unit: "fahrenheit" });
        } else if (location.toLowerCase().includes("paris")) {
            return JSON.stringify({ location: "Paris", temperature: "22", unit: "fahrenheit" });
        } else {
            return JSON.stringify({ location, temperature: "unknown" });
        }
    }

    //recursive function to handle tool calls
    async handleToolCalls(responseMessage: OpenAI.Chat.Completions.ChatCompletionMessage): Promise<any> {
        // Step 2: check if the model wanted to call a function
        const toolCalls = responseMessage.tool_calls;
        if (toolCalls) {
            console.log(toolCalls)
            // Step 3: call the function
            // Note: the JSON response may not always be valid; be sure to handle errors
            const availableFunctions: any = {
                'get_current_weather': this.getCurrentWeather,
                'get_user_401k_Details': this.getUser401kDetails,
                'display_401k_details': this.display401kComponent,
                'get_user_id': this.getUserId
            }; // only one function in this example, but you can have multiple
            this.messages.push(responseMessage); // extend conversation with assistant's reply
            for (const toolCall of toolCalls) {
                const functionName: string = toolCall.function.name;
                const functionToCall = availableFunctions[functionName];
                let functionResponse = null;
                if (functionToCall == this.getUser401kDetails) {
                    const functionArgs = JSON.parse(toolCall.function.arguments);
                    functionResponse = functionToCall(
                        functionArgs.uid,
                    );
                }

                if (functionToCall == this.getUserId) {
                    functionResponse = functionToCall().toString();
                }
                
                this.messages.push({
                    tool_call_id: toolCall.id,
                    role: "tool",
                    content: functionResponse,
                }); // extend conversation with function response
            }

            console.log(this.messages)
            const secondResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-0125",
                messages: this.messages,
            }); // get a new response from the model where it can see the function response
            console.log(secondResponse.choices[0].message.content);
            return await this.handleToolCalls(secondResponse.choices[0].message);
        } else {
            return;
        }
    }

    // ACTUALLY CALLING OPEN AI
    async formatOpenAIPromt(userMessage: string) {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: this.messages,
            tools: this.toolsToCall,
            tool_choice: "auto", // auto is default, but we'll be explicit
        });
        const responseMessage = response.choices[0].message;
        await this.handleToolCalls(responseMessage);
    }
}

let handlerService = new HandlerService();
console.log(handlerService.formatOpenAIPromt(""))