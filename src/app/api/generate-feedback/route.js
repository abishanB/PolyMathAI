import { GoogleGenAI } from "@google/genai";
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request) {
    try {
        const { log, skill, taskName } = await request.json();
        const prompt = `You are an expert coach. Given the following journal log, provide constructive feedback and actionable advice to help the user improve and stay motivated.\n\nTask: ${taskName}\nSkill: ${skill}\nJournal Log: ${log}\n\nRespond with a short paragraph of feedback and a separate actionable advice.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        // Extract the text response
        const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || "No feedback generated.";
        return new Response(JSON.stringify({ feedback: text }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
