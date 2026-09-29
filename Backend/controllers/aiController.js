
import gemimiConfig from "../config/gemini.js";

export const generateBlogContent = async (req, res) => {
    try {
        const { title, category, description } = req.body;

        if (!title) {
            return res.json({
                status: false,
                message: "Title is mandatory for Content Generation"
            });
        }

        let aiPrompt = process.env.AI_PROMPT;
        aiPrompt += ` Title: ${title}`;

        if (description) {
            aiPrompt += ` Description: ${description}`;
        }

        if (category) {
            aiPrompt += ` Category: ${category}`;
        }

        const ai = gemimiConfig();

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: aiPrompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const finalResponseObj = JSON.parse(response.text);

        return res.json({
            status: true,
            message: "Content Generated Successfully",
            data: finalResponseObj
        });

    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        });
    }
}