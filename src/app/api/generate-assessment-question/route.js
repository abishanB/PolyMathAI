import { GoogleGenAI } from "@google/genai";
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Simple API route to generate an AI assessment question based on the current task
export async function POST(req) {
    try {
        const { task } = await req.json();
        const prompt = `Generate a brief assessment question for a student who just completed the following task: '${task}'. Depending on the task, the question can be a conceptual understanding check or a reflection on the learning process. Make sure to ask just one, concise question.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const question = response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "What was your biggest challenge today?";
        return new Response(JSON.stringify({ question }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        return new Response(JSON.stringify({ question: "What was your biggest challenge today?" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
