import { GoogleGenAI, Type } from "@google/genai";
require('dotenv').config();

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

export async function POST(request) {
  try {
    const userProfile = await request.json();
    const { skills, priorities, availableHours, preferredTimes } = userProfile;
    
    // Handle null/empty preferredTimes
    const timePreference = preferredTimes && preferredTimes.length > 0 
      ? `Preferred time slots: ${preferredTimes.join(', ')}`
      : `No specific time preferences - create a balanced schedule throughout the day`;
    
    const prompt = `Create a personalized daily learning schedule for someone with the following preferences:
    
Skills to learn: ${skills.join(', ')}
Skill priorities (1-10 scale): ${Object.entries(priorities).map(([skill, priority]) => `${skill}: ${priority}`).join(', ')}
Available hours per day: ${availableHours}
${timePreference}

Please create a flexible daily learning schedule that allocates more time to higher priority skills and respects the user's preferred time slots. Include specific learning tasks for each skill and distribute sessions across the available hours. Set completed to false for all sessions.

IMPORTANT: For startTime and endTime, always use 12-hour format with AM/PM (e.g., "2:30 PM", "9:00 AM"). Never use 24-hour format.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: {
                type: Type.STRING,
              },
              skill: {
                type: Type.STRING,
              },
              task: {
                type: Type.STRING,
              },
              startTime: {
                type: Type.STRING,
              },
              endTime: {
                type: Type.STRING,
              },
              duration: {
                type: Type.NUMBER,
              },
              priority: {
                type: Type.NUMBER,
              },
              completed: {
                type: Type.BOOLEAN,
              },
            },
            propertyOrdering: ["id", "skill", "task", "startTime", "endTime", "duration", "priority", "completed"],
          },
        },
      },
    });

    const scheduleData = JSON.parse(response.text);
    return Response.json({ schedule: scheduleData });
  } catch (error) {
    console.error("Error generating schedule with Gemini:", error);
    return Response.json({ error: "Failed to generate schedule" }, { status: 500 });
  }
}