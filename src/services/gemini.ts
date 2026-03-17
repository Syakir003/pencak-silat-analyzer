import { AthleteData, AnalysisResult, VideoAnalysisResult } from "../types";

const GAS_URL = "https://script.google.com/macros/s/AKfycbwuZkU6mCxWOEAPOSrCfwjWZqtwHHnHyq1rVy_Z9iXkwZH3lKBASijPYaDcGiCxz8tz/exec";

export async function analyzeAthlete(data: AthleteData, lang: string): Promise<AnalysisResult> {
  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: "analyzeAthlete", data, lang }),
    });
    
    const result = await response.json();

    // Jaminan agar properti hasil atlet tidak undefined saat di-render
    return {
      category: result?.category ?? "Analisis Selesai",
      reasoning: result?.reasoning ?? "Data berhasil diproses sistem.",
      trainingProgram: result?.trainingProgram ?? "Program sedang disiapkan.",
      // KUNCI PERBAIKAN: Pastikan ini string agar .split() tidak error
      powerSchedule: result?.powerSchedule ?? "", 
      nutritionPlan: result?.nutritionPlan ?? "Rencana nutrisi akan segera tampil."
    };
  } catch (error) {
    console.error("Athlete Analysis Error:", error);
    return {
      category: "Error",
      reasoning: "Gagal menghubungkan ke server AI.",
      trainingProgram: "",
      powerSchedule: "",
      nutritionPlan: ""
    };
  }
}

import { GoogleGenAI, Type } from "@google/genai";
import { AthleteData, AnalysisResult, VideoAnalysisResult } from "../types";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});
console.log(import.meta.env.VITE_GEMINI_API_KEY);
export async function analyzeAthlete(
  data: AthleteData,
  lang: "id" | "en",
): Promise<AnalysisResult> {
  const model = "gemini-2.5-flash";
  const prompt = `Analyze this Pencak Silat athlete:
    Name: ${data.name}
    Age: ${data.age}
    Weight: ${data.weight}kg
    Height: ${data.height}cm

    Language: ${lang === "id" ? "Indonesian" : "English"}

    Determine if they are better suited for 'Fighter' (Tanding) or 'Seni' (Art) category.
    Provide:
    1. Category (Fighter or Seni)
    2. Reasoning
    3. Personalized Training Program (Include specific counts for exercises like Push-ups, Sit-ups, Squats, and Running distance/duration)
    4. Power Training Schedule (specific exercises for power with exact sets and reps)
    5. Nutrition Plan

    Respond in JSON format.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, enum: ["Fighter", "Seni"] },
          reasoning: { type: Type.STRING },
          trainingProgram: { type: Type.STRING },
          powerSchedule: { type: Type.STRING },
          nutritionPlan: { type: Type.STRING },
        },
        required: [
          "category",
          "reasoning",
          "trainingProgram",
          "powerSchedule",
          "nutritionPlan",
        ],
      },
    },
  });

  const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

  console.log("AI TEXT:", text);

  return JSON.parse(text || "{}");
}

export async function analyzeVideo(
  videoBase64: string,
  mimeType: string,
  lang: "id" | "en",
): Promise<VideoAnalysisResult> {
  const model = "gemini-2.5-flash";
  const prompt = `Analyze this Pencak Silat performance video.
    Language: ${lang === "id" ? "Indonesian" : "English"}
    Identify:
    1. Number of punches (pukulan)
    2. Number of kicks (tendangan)
    3. Techniques used (e.g., Sabit, Gejlig, Tangkisan, etc.)
    4. A detailed explanation of the performance.

    Respond in JSON format.`;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { data: videoBase64, mimeType } },
        { text: prompt },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          punches: { type: Type.INTEGER },
          kicks: { type: Type.INTEGER },
          techniques: { type: Type.ARRAY, items: { type: Type.STRING } },
          explanation: { type: Type.STRING },
        },
        required: ["punches", "kicks", "techniques", "explanation"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}
