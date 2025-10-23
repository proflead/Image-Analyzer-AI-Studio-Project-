
import { GoogleGenAI } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeImage = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType, data: base64Image } },
          { text: "Describe this image in detail. Then, find websites that contain similar images." }
        ]
      },
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const description = response.text;
    const similarImages = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    if (!description) {
      throw new Error("Failed to generate a description for the image.");
    }
    
    return { description, similarImages };

  } catch (error) {
    console.error("Error analyzing image with Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to analyze image: ${error.message}`);
    }
    throw new Error("An unknown error occurred during image analysis.");
  }
};
