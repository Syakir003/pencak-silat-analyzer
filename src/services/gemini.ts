import { AthleteData, AnalysisResult, VideoAnalysisResult } from "../types";

// Ganti dengan URL yang didapat dari langkah Deploy GAS di atas
const GAS_URL = "https://script.google.com/macros/s/AKfycbxmNG5uLFsUb_cV1FNGl4XxTScaVpERnaSf_mi2VTn7XzOkNI1aBr-eDP8Abs2aeHfz/exec";

/**
 * Memproses analisis data fisik atlet
 */
export async function analyzeAthlete(
  data: AthleteData,
  lang: "id" | "en"
): Promise<AnalysisResult> {
  const response = await fetch(GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action: "analyzeAthlete", data, lang }),
  });

  if (!response.ok) throw new Error("Gagal menghubungi AI Server");
  return await response.json();
}

/**
 * Memproses analisis gerakan video
 */
export async function analyzeVideo(
  videoBase64: string,
  mimeType: string,
  lang: "id" | "en"
): Promise<VideoAnalysisResult> {
  const response = await fetch(GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action: "analyzeVideo", videoBase64, mimeType, lang }),
  });

  if (!response.ok) throw new Error("Gagal menganalisis video");
  return await response.json();
}
