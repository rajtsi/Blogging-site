
import gemimiConfig from "../config/gemini.js";

export const generateBlogContent = async (req, res) => {
    try {

        const {
            title,
            category,
            discription
        } = req.body;


        if (!title) {
            return res.json({
                status: false,
                message: "Title is mondatory for Content Generation"
            })
        }
        let aiPrompt = process.env.AI_PROMPT;
        aiPrompt += `title for content generation is ${title}`;
        if (discription) {
            aiPrompt += ` description is ${discription}`;
        }
        if (category) {
            aiPrompt += `and category is ${category}`;
        }

        console.log(aiPrompt);

        // we have a input (aiPrompt)-> we want and output that will be out generated content
        const ai = gemimiConfig();
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: aiPrompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        let responseStr = response.text;

        const finalResponseObj = JSON.parse(responseStr);

        return res.json({
            status: true,
            message: "Content Generated Successfully",
            data: finalResponseObj
        });

    }
    catch (error) {
        return res.json({
            status: false,
            message: error.message
        })

    }

}