
import { GoogleGenAI, Type } from "@google/genai";
import { DesignIdea } from "../types";

// Always use the apiKey as a named parameter and use process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDesignIdeas = async (prompt: string): Promise<DesignIdea[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 creative custom patch design ideas based on this user description: "${prompt}". 
      Return the response in a structured JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              concept: { type: Type.STRING },
              style: { type: Type.STRING },
              recommendedBacking: { type: Type.STRING },
            },
            required: ["title", "concept", "style", "recommendedBacking"],
            propertyOrdering: ["title", "concept", "style", "recommendedBacking"],
          },
        },
      },
    });

    // The text property of the response object is used to retrieve the generated text content.
    const jsonStr = response.text?.trim();
    return JSON.parse(jsonStr || "[]");
  } catch (error) {
    console.error("Error generating ideas:", error);
    return [];
  }
};
