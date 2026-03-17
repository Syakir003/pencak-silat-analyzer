import { AthleteData, AnalysisResult, VideoAnalysisResult } from "../types";

// TEMPELKAN URL GAS KAMU DI SINI
const GAS_URL = "https://script.google.com/macros/s/AKfycbywjHsjkqKMlNIWAyH0MjjK9UMYpHwMIEgAp2lKB1szcXEEuk8PT1yA4ul2VATaHA/exec";

export async function analyzeAthlete(data: AthleteData, lang: "id" | "en"): Promise<AnalysisResult> {
  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: "analyzeAthlete", data, lang }),
    });
    
    const res = await response.json();
    
    // Proteksi agar .split() tidak error jika field kosong
    return {
      category: res.category || "Fighter",
      reasoning: res.reasoning || "Data berhasil dianalisis.",
      trainingProgram: res.trainingProgram || "Program belum tersedia.",
      powerSchedule: String(res.powerSchedule || ""), // Jaminan String
      nutritionPlan: res.nutritionPlan || "Rencana nutrisi belum tersedia."
    };
  } catch (error) {
    console.error("Athlete Analysis Error:", error);
    return {
      category: "Fighter",
      reasoning: "Gagal terhubung ke server.",
      trainingProgram: "",
      powerSchedule: "",
      nutritionPlan: ""
    };
  }
}

export async function analyzeVideo(videoBase64: string, mimeType: string, lang: "id" | "en"): Promise<VideoAnalysisResult> {
  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: "analyzeVideo", videoBase64, mimeType, lang }),
    });
    
    const res = await response.json();
    
    return {
      punches: res.punches ?? 0,
      kicks: res.kicks ?? 0,
      techniques: Array.isArray(res.techniques) ? res.techniques : [],
      explanation: res.explanation || "Analisis video gagal."
    };
  } catch (error) {
    console.error("Video Analysis Error:", error);
    return {
      punches: 0,
      kicks: 0,
      techniques: [],
      explanation: "Koneksi terputus saat menganalisis video."
    };
  }
}
