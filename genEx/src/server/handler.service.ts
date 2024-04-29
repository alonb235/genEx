import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import ChatCompletionCreateParamsBase from 'openai';
import ChatCompletionTool from 'openai';
import * as hacakthon_keys from "c:/shared/content/config/api-keys/hackathon_openai_keys.json"
import { user401kData } from './user401kData';

const OPEN_AI_KEY = hacakthon_keys["team_9"]

const openai = new OpenAI({
    apiKey: OPEN_AI_KEY
});

class HandlerService {
    constructor() {
    }

    getUser401kPercentage(uid: number) {
        
    }

    display401kComponent(data: user401kData) {

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

    // ACTUALLY CALLING OPEN AI
    async formatOpenAIPromt(userMessage: string) {
        const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            { role: "user", content: "What's the weather like in San Francisco, Tokyo, and Paris?" },
        ];
        const toolsToCall: OpenAI.Chat.Completions.ChatCompletionTool[] = [
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
        ];


        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: messages,
            tools: toolsToCall,
            tool_choice: "auto", // auto is default, but we'll be explicit
        });
        const responseMessage = response.choices[0].message;

        // Step 2: check if the model wanted to call a function
        const toolCalls = responseMessage.tool_calls;
        if (toolCalls) {
            // Step 3: call the function
            // Note: the JSON response may not always be valid; be sure to handle errors
            const availableFunctions: any = {
                'get_current_weather' : this.getCurrentWeather,
            }; // only one function in this example, but you can have multiple
            messages.push(responseMessage); // extend conversation with assistant's reply
            for (const toolCall of toolCalls) {
                const functionName: string = toolCall.function.name;
                const functionToCall = availableFunctions[functionName];
                const functionArgs = JSON.parse(toolCall.function.arguments);
                const functionResponse = functionToCall(
                    functionArgs.location,
                    functionArgs.unit
                );
                messages.push({
                    tool_call_id: toolCall.id,
                    role: "tool",
                    content: functionResponse,
                }); // extend conversation with function response
            }
            const secondResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-0125",
                messages: messages,
            }); // get a new response from the model where it can see the function response
            console.log(secondResponse.choices[0].message.content);
            return secondResponse.choices;
        } else {
            return "NOT WORKING";
        }
    }
}

let handlerService = new HandlerService();
console.log(handlerService.formatOpenAIPromt(""))