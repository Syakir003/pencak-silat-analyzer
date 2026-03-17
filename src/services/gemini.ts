import { AthleteData, AnalysisResult, VideoAnalysisResult } from "../types";

const GAS_URL = "https://script.google.com/macros/s/AKfycbwuZkU6mCxWOEAPOSrCfwjWZqtwHHnHyq1rVy_Z9iXkwZH3lKBASijPYaDcGiCxz8tz/exec";

export async function analyzeAthlete(data: AthleteData, lang: string): Promise<AnalysisResult> {
  const response = await fetch(GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action: "analyzeAthlete", data, lang }),
  });
  return await response.json();
}

export async function analyzeVideo(videoBase64: string, mimeType: string, lang: string): Promise<VideoAnalysisResult> {
  const response = await fetch(GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action: "analyzeVideo", videoBase64, mimeType, lang }),
  });
  
  const result = await response.json();
  // Jaminan agar properti penting tidak undefined
  return {
    punches: result.punches ?? 0,
    kicks: result.kicks ?? 0,
    techniques: Array.isArray(result.techniques) ? result.techniques : [],
    explanation: result.explanation ?? "Tidak ada deskripsi."
  };
}
