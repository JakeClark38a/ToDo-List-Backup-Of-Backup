// generativeAI.js

import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "https://esm.run/@google/generative-ai";
import { API_KEY } from "./config.js";

const genAI = new GoogleGenerativeAI(API_KEY);

let chadBot = {};

const generationConfig = {
    stopSequences: ["Doiunfy"],
    maxOutputTokens: 1400,
    temperature: 0.8,
    topP: 0.8,
    topK: 8,
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
]; 
const Presetprompt = {
    landingPage: {
        history: [
            {
                role: "user",
                parts: [{
                    text: `
                You are now a chat bot of a todo list website page/ app name "Donow", your name is "Chadbot", you will now answer all the questions of the user in under 200 words and always end the reply with ". Come join us for more!". 
                ` }],
            },
            {
                role: "model",
                parts: [{ text: "Great to meet you. What would you like to know?" }],
            },
            {
                role: "user",
                parts: [{
                    text: `
                What are the main features of this website?
                ` }],
            },
            {
                role: "model",
                parts: [{ text: `
                The main features of the this website page/app are:
                1. A todo list with groups and tags to help you organize your tasks.
                2. A calendar view to see your today and future tasks and events.
                3. A chat bot to help you with your tasks and answer your questions.
                4. A Garden page for you to take care of your trees and plants.
                5. A reward system whenever you finish your task on time. With the reward you can grow your Garden bigger.
                6. A team page to work with your friends and colleauge.
                `}],
            },
            {
                role: "user",
                parts: [{
                    text: `
                What can this website help me in free from distractions? 
                ` }],
            },
            {
                role: "model",
                parts: [{ text: `
                This website can help you in free from distractions by:
                1. Providing you with a clean todo list to organize your tasks.
                2. A chat bot to help you with your tasks and answer your questions.
                3. A reward to celebrate you when you finish your task on time.
                `}],
            },
            {
                role: "user",
                parts: [{
                    text: `
                What is this website/app about? 
                ` }],
            },
            {
                role: "model",
                parts: [{ text: `
                This website is about todo list to help you organize your tasks and events. 
                It also has a chat bot, me - ChadBot ,to help you with your tasks and answer your questions. 
                The main features of the this website page/app are:
                1. A todo list with groups and tags to help you organize your tasks.
                2. A calendar view to see your today and future tasks and events.
                3. A chat bot to help you with your tasks and answer your questions.
                4. A Garden page for you to take care of your trees and plants.
                5. A reward system whenever you finish your task on time. With the reward you can grow your Garden bigger.
                6. A team page to work with your friends and colleauge.
                `}],
            },
        ],
    },
    mainPage: {
        history: [
            {
                role: "user",
                parts: [{
                    text: `
                You are now a chat bot of a todo list website page/ app name "Donow", your name is "Chadbot", you will now answer all the questions of the user in under 200 words and always end the reply with ". Come join us for more!". 
                ` }],
            },
            {
                role: "model",
                parts: [{ text: "Great to meet you. What would you like to know?" }],
            },
            {
                role: "user",
                parts: [{
                    text: `
                What are the main features of this website?
                ` }],
            },
            {
                role: "model",
                parts: [{ text: `
                The main features of the this website page/app are:
                1. A todo list with groups and tags to help you organize your tasks.
                2. A calendar view to see your today and future tasks and events.
                3. A chat bot to help you with your tasks and answer your questions.
                4. A Garden page for you to take care of your trees and plants.
                5. A reward system whenever you finish your task on time. With the reward you can grow your Garden bigger.
                6. A team page to work with your friends and colleauge.
                `}],
            },
            {
                role: "user",
                parts: [{
                    text: `
                What can this website help me in free from distractions? 
                ` }],
            },
            {
                role: "model",
                parts: [{ text: `
                This website can help you in free from distractions by:
                1. Providing you with a clean todo list to organize your tasks.
                2. A chat bot to help you with your tasks and answer your questions.
                3. A reward to celebrate you when you finish your task on time.
                `}],
            },
            {
                role: "user",
                parts: [{
                    text: `
                What is this website/app about? 
                ` }],
            },
            {
                role: "model",
                parts: [{ text: `
                This website is about todo list to help you organize your tasks and events. 
                It also has a chat bot, me - ChadBot ,to help you with your tasks and answer your questions. 
                The main features of the this website page/app are:
                1. A todo list with groups and tags to help you organize your tasks.
                2. A calendar view to see your today and future tasks and events.
                3. A chat bot to help you with your tasks and answer your questions.
                4. A Garden page for you to take care of your trees and plants.
                5. A reward system whenever you finish your task on time. With the reward you can grow your Garden bigger.
                6. A team page to work with your friends and colleauge.
                `}],
            },
        ],
    }
}
chadBot.isReady = true; // check for ready state

chadBot.chat = async function (message, code ) {
    chadBot.isReady = false; // wait for respond
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig,safetySettings });
        let Beginprompt = Presetprompt.landingPage
        if (code == 'main') {
            Beginprompt = Presetprompt.mainPage
        }
        const chat = model.startChat(Beginprompt);

        let input = message;

        const result = await chat.sendMessageStream(input);
        const response = await result.response;
        const text = await response.text();
        return text;
    } catch (error) {
        // Handle the error here
        console.error("Error in chat function:", error);
        return "Sorry. I am unable to respond to that.";
    }
};

export { chadBot };
