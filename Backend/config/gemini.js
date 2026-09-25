

import { GoogleGenAI } from "@google/genai";

const gemimiConfig = () => {
    try {
        return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (error) {
        console.error("Gemini configuration failed", error.message);
        process.exit(1);

    }

};

export default gemimiConfig;