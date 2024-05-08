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
const Presetprompt_landingPage = { /// training the AI with data following
    history: [
        {
            role: "user",
            parts: [{
                text: `
                You are now a chat bot of a todo list website page/ app name "Donow", your name is "Chadbot", created by Null, you will now answer all the questions of the user in under 200 words and always end the reply with ". Come join us for more!". 
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
            parts: [{
                text: `
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
            parts: [{
                text: `
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
            parts: [{
                text: `
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
};
const Presetprompt_mainPage = {
    history: [
        {
            role: "user",
            parts: [{
                text: `
                You are now a chat bot of a todo list website page/ app name "Donow", your name is "Chadbot", created by Null. 
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
            parts: [{
                text: `
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
            parts: [{
                text: `
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
            parts: [{
                text: `
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
        {
            role: "user",
            parts: [{
                text: `
                    I have to buy the cat litter at the store before it close at 7PM. And maybe meeting with my friend at 8PM so we can go out for a dinner. Tomorrow, i have to submit the report for the bos at &AM , quite tired. And i have a board meeting at 2PM that same day ,argggh. 
                ` }],
        },
        {
            role: "model",
            parts: [{
                text: `
                Got it, I've created some suggest tasks for you. Hope you doing well .Is there anything else I can help you with? 
                [BeginTask] 
                [TSEPT] [Task] Buy cat litter [/Task] [Des] At the store [/Des] [Due] Today : 7PM [/Due] [Group] Do [/Group] [Tag] Other [/Tag]
                [TSEPT] [Task] Meet with friend [/Task] [Des] Go for dinner [/Des]   [Due] Today : 8PM [/Due] [Group] Schedule [/Group] [Tag] Friends [/Tag] 
                [TSEPT] [Task] Submit report for boss [/Task] [Des]  [/Des]  [Due] Tomorrow : 8AM [/Due] [Group] Do [/Group] [Tag] Work [/Tag] 
                [TSEPT] [Task] Board meeting [/Task] [Des]  [/Des]  [Due] Tomorrow : 2PM [/Due] [Group] Schedule [/Group] [Tag] Work [/Tag] 
                [TSEPT] 
                [EndTask] . 
                `}],
        },
        {
            role: "user",
            parts: [{
                text: `
                You will analyse this information and given out the task details:

                As the afternoon transitions into evening, the anticipation of physical activity looms on the horizon. At 6 PM, the gym beckons, offering an opportunity to invigorate the body and clear the mind. With determination, you embark on a workout regimen, focusing on strength training, cardiovascular exercises, and stretching routines to enhance physical well-being. Following the gym session, the evening unfolds with the possibility of a leisurely jog at 9 PM, accompanied by a friend. The rhythmic cadence of footsteps against pavement serves as a backdrop for shared conversations and camaraderie, fostering both physical and emotional health. As night falls and the day draws to a close, thoughts shift to preparations for the upcoming conference at WeezHall. With the conference scheduled for 9 AM tomorrow, meticulous planning and organization are essential. Tasks such as reviewing presentations, gathering pertinent materials, and ensuring logistical arrangements are in order occupy the remaining hours of the evening.
                
                In the following format:    
                [BeginTask] 
                [TSEPT] [Task] Pick up laundry [/Task] [Des] Pickup some dry cleaning [/Des] [Due] Today : 5PM [/Due] [Group] Do [/Group] [Tag] Other [/Tag]
                [TSEPT] [Task] <next task>
                [TSEPT]
                [EndTask]
                ` }],
        },
        {
            role: "model",
            parts: [{
                text: `
                Okay, I've added it to your to-do list. Is there anything else I can help you with? 
                [BeginTask] 
                [TSEPT] [Task] Go to the gym [/Task] [Des]  [/Des]  [Due] Today : 6PM [/Due] [Group] Do [/Group] [Tag] Health [/Tag] 
                [TSEPT] [Task] Go for a jog with a friend [/Task] [Des] With a friend [/Des]  [Due] Today : 9PM [/Due] [Group] Schedule [/Group] [Tag] Friends [/Tag]
                [TSEPT] [Task] Prepare for conference [/Task] [Des]  At WeezHall [/Des]  [Due] Tomorrow : 9AM [/Due] [Group] Do [/Group] [Tag] Work [/Tag] 
                [TSEPT] [Task] Go to the gym [/Task] [Des]  [/Des]  [Due] Today : 6PM [/Due] [Group] Do [/Group] [Tag] Health [/Tag] 
                [TSEPT] 
                [EndTask]
                `}],
        },
        {
            role: "user",
            parts: [{
                text: `
                You will analyse this information and given out the task details:

                I have to go to the grocery store to buy some food for the week. I also need to clean the house and do the laundry. I have a meeting with my boss at 10am tomorrow and I need to prepare a presentation for it. I also need to pick up my dry cleaning before 5pm. 
                
                In the following format:    
                [BeginTask] 
                [TSEPT] [Task] Pick up laundry [/Task] [Des] Pickup some dry cleaning [/Des] [Due] Today : 5PM [/Due] [Group] Do [/Group] [Tag] Other [/Tag]
                [TSEPT] [Task] <next task>
                [TSEPT]
                [EndTask]
                ` }],
        },
        {
            role: "model",
            parts: [{
                text: `
                Got it, I've created some suggest tasks for you. Hope you doing well .Is there anything else I can help you with? 
                [BeginTask] 
                [TSEPT] [Task] Go to the grocery store [/Task] [Des] Buy some food for the week [/Des] [Due] Today : 7PM [/Due] [Group] Do [/Group] [Tag] Other [/Tag]
                [TSEPT] [Task] Clean the house [/Task] [Des]  [/Des]  [Due] Today : 7PM [/Due] [Group] Do [/Group] [Tag] Home [/Tag] 
                [TSEPT] [Task] Do the laundry [/Task] [Des]  [/Des]  [Due] Today : 7PM [/Due] [Group] Do [/Group] [Tag] Home [/Tag] 
                [TSEPT] [Task] Prepare presentation for meeting [/Task] [Des]  [/Des]  [Due] Tomorrow : 10AM [/Due] [Group] Do [/Group] [Tag] Work [/Tag] 
                [TSEPT] [Task] Pick up dry cleaning [/Task] [Des]  [/Des]  [Due] Today : 5PM [/Due] [Group] Do [/Group] [Tag] Other [/Tag] 
                [TSEPT] 
                [EndTask] . 
                `}],
        },
        {
            role: "user",
            parts: [{
                text: `
                You will analyse this information and given out the task details:

                Remind me to pick up my dry cleaning at 5pm today.

                In the following format:    
                [BeginTask] 
                [TSEPT] [Task] Pick up laundry [/Task] [Des] Pickup some dry cleaning [/Des] [Due] Today : 5PM [/Due] [Group] Do [/Group] [Tag] Other [/Tag]
                [TSEPT] [Task] <next task>
                [TSEPT]
                [EndTask]
                ` }],
        },
        {
            role: "model",
            parts: [{
                text: `
                Got it, I've created some suggest tasks to remind you .Is there anything else I can help you with? 
                [BeginTask] 
                [TSEPT] [Task] Pick up laundry [/Task] [Des] Pickup some dry cleaning [/Des] [Due] Today : 5PM [/Due] [Group] Do [/Group] [Tag] Other [/Tag]
                [TSEPT] [Task] Prepare presentation for meeting [/Task] [Des]  [/Des]  [Due] Tomorrow : 10AM [/Due] [Group] Do [/Group] [Tag] Work [/Tag] 
                [TSEPT] [Task] Go to the gym [/Task] [Des]  [/Des]  [Due] Today : 6PM [/Due] [Group] Do [/Group] [Tag] Health [/Tag] 
                [TSEPT] [Task]
                [TSEPT]
                [EndTask]
                `
            }],
        },
        {
            role: "user",
            parts: [{
                text: `
                    Generate random 3 tasks for me.
                ` }],
        },
        {
            role: "model",
            parts: [{
                text: `
                Got it, I've created some suggest tasks .Is there anything else I can help you with? 
                [BeginTask] 
                [TSEPT] [Task] Pick up laundry [/Task] [Des] Pickup some dry cleaning [/Des] [Due] Today : 5PM [/Due] [Group] Do [/Group] [Tag] Other [/Tag]
                [TSEPT]
                [EndTask]
                `
            }],
        },
    ],
}
chadBot.isReady = true; // check for ready state

chadBot.chat = async function (message, code) {
    chadBot.isReady = false; // wait for respond
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig, safetySettings });
        let Beginprompt = Presetprompt_landingPage
        if (code == 'main') { // code check for what page are u in
            Beginprompt = Presetprompt_mainPage
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
