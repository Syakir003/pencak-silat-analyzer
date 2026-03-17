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

export async function analyzeVideo(videoBase64: string, mimeType: string, lang: string): Promise<VideoAnalysisResult> {
  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: "analyzeVideo", videoBase64, mimeType, lang }),
    });
    
    const result = await response.json();
    
    return {
      punches: result?.punches ?? 0,
      kicks: result?.kicks ?? 0,
      techniques: Array.isArray(result?.techniques) ? result.techniques : [],
      explanation: result?.explanation ?? "Tidak ada deskripsi tersedia.",
      // Jaga-jaga jika komponen video juga butuh field ini
      powerSchedule: result?.powerSchedule ?? ""
    };
  } catch (error) {
    console.error("Video Analysis Error:", error);
    return {
      punches: 0,
      kicks: 0,
      techniques: [],
      explanation: "Terjadi gangguan saat menganalisis video.",
      powerSchedule: ""
    };
  }
}
