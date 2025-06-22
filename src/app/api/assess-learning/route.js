import { GoogleGenAI } from "@google/genai";
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
    try {
        const { question, userResponse, task, skill } = await req.json();
        const prompt = `You are an expert learning coach. The following is an AI-generated assessment question and a student's 
        response after completing a learning task. Please provide a short, 
        thoughtful assessment of the student's learning, including strengths, areas for improvement, 
        and a single actionable suggestion. Then, give a final grading on whether the student passed the assessment; 
        be lenient, but fail answers that have zero effort. \n\nTask: ${task}\nSkill: ${skill}\nAssessment Question: ${question}\nStudent Response: ${userResponse}\n\nRespond with a concise assessment and a single actionable suggestion.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const assessment = response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Assessment not available.";
        return new Response(JSON.stringify({ assessment }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        return new Response(JSON.stringify({ assessment: "Assessment not available." }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
