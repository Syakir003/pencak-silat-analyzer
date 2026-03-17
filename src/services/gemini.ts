import { AthleteData, AnalysisResult, VideoAnalysisResult } from "../types";

/**
 * URL Web App dari Google Apps Script yang sudah di-deploy.
 * Pastikan URL ini berakhiran /exec
 */
const GAS_URL = "https://script.google.com/macros/s/AKfycbxmNG5uLFsUb_cV1FNGl4XxTScaVpERnaSf_mi2VTn7XzOkNI1aBr-eDP8Abs2aeHfz/exec";

/**
 * 1. Fungsi Analisis Atlet (Teks)
 * Memanggil backend GAS untuk memproses data atlet
 */
export async function analyzeAthlete(
  data: AthleteData,
  lang: "id" | "en"
): Promise<AnalysisResult> {
  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      // Menggunakan 'text/plain' untuk menghindari isu CORS preflight pada GAS
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        action: "analyzeAthlete",
        data: data,
        lang: lang,
      }),
    });

    if (!response.ok) throw new Error("Network response was not ok");
    
    return await response.json();
  } catch (error) {
    console.error("Gagal menganalisis atlet via GAS:", error);
    throw error;
  }
}

/**
 * 2. Fungsi Analisis Video (Multimodal)
 * Mengirimkan string base64 video ke GAS
 */
export async function analyzeVideo(
  videoBase64: string,
  mimeType: string,
  lang: "id" | "en"
): Promise<VideoAnalysisResult> {
  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        action: "analyzeVideo",
        videoBase64: videoBase64,
        mimeType: mimeType,
        lang: lang,
      }),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    return await response.json();
  } catch (error) {
    console.error("Gagal menganalisis video via GAS:", error);
    throw error;
  }
}
