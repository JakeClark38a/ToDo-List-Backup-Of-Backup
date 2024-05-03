// generativeAI.js

import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "https://esm.run/@google/generative-ai";
import { API_KEY } from "./config.js";

const genAI = new GoogleGenerativeAI(API_KEY);

let chadBot = {};

chadBot.chat = async function (message) {
    try {
        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ]; // not including yet 
        let input = message;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(input);
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
