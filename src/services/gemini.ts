import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";
import { AthleteData, AnalysisResult, VideoAnalysisResult } from "../types";

/**
 * Inisialisasi Google AI dengan API Key baru Anda.
 * Pastikan VITE_GEMINI_API_KEY sudah di-update di .env dan dashboard Netlify.
 */
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * 1. Fungsi Analisis Atlet (Teks)
 */
export async function analyzeAthlete(
  data: AthleteData,
  lang: "id" | "en"
): Promise<AnalysisResult> {
  // Definisi Schema yang presisi untuk menghindari error "not assignable to type Schema"
  const athleteSchema: Schema = {
    type: SchemaType.OBJECT,
    properties: {
      category: { 
        type: SchemaType.STRING, 
        enum: ["Fighter", "Seni"],
        description: "Category recommendation for the athlete"
      },
      reasoning: { type: SchemaType.STRING },
      trainingProgram: { type: SchemaType.STRING },
      powerSchedule: { type: SchemaType.STRING },
      nutritionPlan: { type: SchemaType.STRING },
    },
    required: ["category", "reasoning", "trainingProgram", "powerSchedule", "nutritionPlan"],
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // VERSI STABIL
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: athleteSchema,
    },
  });

  const prompt = `Analyze this Pencak Silat athlete for professional recommendation:
    Name: ${data.name}, Age: ${data.age}, Weight: ${data.weight}kg, Height: ${data.height}cm.
    Language: ${lang === "id" ? "Indonesian" : "English"}.
    
    Determine if they suit 'Fighter' (Tanding) or 'Seni' (Art). 
    Provide specific counts for exercises and a detailed nutrition plan.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("Gagal menganalisis atlet:", error);
    // Kembalikan objek kosong atau error handling sesuai kebutuhan UI Anda
    throw error;
  }
}

/**
 * 2. Fungsi Analisis Video (Multimodal)
 */
export async function analyzeVideo(
  videoBase64: string,
  mimeType: string,
  lang: "id" | "en"
): Promise<VideoAnalysisResult> {
  const videoSchema: Schema = {
    type: SchemaType.OBJECT,
    properties: {
      punches: { type: SchemaType.NUMBER },
      kicks: { type: SchemaType.NUMBER },
      techniques: { 
        type: SchemaType.ARRAY, 
        items: { type: SchemaType.STRING } 
      },
      explanation: { type: SchemaType.STRING },
    },
    required: ["punches", "kicks", "techniques", "explanation"],
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: videoSchema,
    },
  });

  const prompt = `Analyze this Pencak Silat performance video.
    Language: ${lang === "id" ? "Indonesian" : "English"}.
    Identify total punches, total kicks, specific techniques used, 
    and provide a professional critique.`;

  try {
    const result = await model.generateContent([
      { inlineData: { data: videoBase64, mimeType } },
      { text: prompt },
    ]);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("Gagal menganalisis video:", error);
    throw error;
  }
}
