import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Video, Zap, Hash, Info, Box } from 'lucide-react';
import { analyzeVideo } from '../services/gemini';
import { VideoAnalysisResult } from '../types';
import { translations } from '../translations';

interface Props {
  lang: 'id' | 'en';
}

export const VideoAnalysisSection: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<VideoAnalysisResult | null>(null);
  const [videoPreview, setVideoPreview] = React.useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Batasi ukuran file (GAS limit)
    if (file.size > 20 * 1024 * 1024) {
      alert(lang === 'id' ? "Ukuran video terlalu besar (Maks 20MB)" : "Video size too large (Max 20MB)");
      return;
    }

    setLoading(true);
    setResult(null);
    setVideoPreview(URL.createObjectURL(file));

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64 = (reader.result as string).split(',')[1];
          const analysis = await analyzeVideo(base64, file.type, lang);
          setResult(analysis);
        } catch (error) {
          console.error('Video analysis error:', error);
          alert("Gagal menganalisis video. Silakan coba video lain.");
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('File reading error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold neon-text-gold">{t.videoTitle}</h2>
        <p className="opacity-60">{t.videoDesc}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Area */}
        <div className="space-y-4">
          <div className="glass-panel p-4 rounded-2xl aspect-video relative flex items-center justify-center overflow-hidden border-dashed border-2 border-black/10 dark:border-white/10 bg-white/5">
            {loading && (
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-silat-gold z-20 shadow-[0_0_15px_rgba(212,175,55,1)]"
              />
            )}
            {videoPreview ? (
              <video src={videoPreview} controls className="w-full h-full object-contain rounded-lg" />
            ) : (
              <label className="cursor-pointer flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-silat-gold/20 transition-all">
                  <Upload className="text-silat-gold" />
                </div>
                <span className="text-sm opacity-60">{t.selectVideo}</span>
                <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
              </label>
            )}
          </div>
          <div className="flex items-center gap-2 text-[10px] opacity-40 justify-center uppercase tracking-widest">
            <Info size={12} />
            <span>Format: MP4/MOV (Max 20MB)</span>
          </div>
        </div>

        {/* Results Area */}
        <div className="space-y-6">
          {loading ? (
            <div className="glass-panel p-8 rounded-2xl h-full flex flex-col items-center justify-center gap-4 bg-white/5">
              <div className="w-12 h-12 border-4 border-silat-gold/30 border-t-silat-gold rounded-full animate-spin" />
              <p className="text-silat-gold animate-pulse font-mono uppercase text-[10px] tracking-widest">{t.analyzing}</p>
            </div>
          ) : result ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-4 rounded-xl flex items-center gap-3 bg-white/5">
                  <Zap className="text-silat-gold" size={20} />
                  <div>
                    <div className="text-[10px] opacity-50 uppercase">{t.punches}</div>
                    <div className="text-2xl font-bold">{result.punches || 0}</div>
                  </div>
                </div>
                <div className="glass-panel p-4 rounded-xl flex items-center gap-3 bg-white/5">
                  <Zap className="text-silat-gold" size={20} />
                  <div>
                    <div className="text-[10px] opacity-50 uppercase">{t.kicks}</div>
                    <div className="text-2xl font-bold">{result.kicks || 0}</div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl bg-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <Hash className="text-silat-gold" size={18} />
                  <h4 className="font-bold uppercase tracking-wider text-xs">{t.techDetected}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(result.techniques || []).map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-silat-gold/10 border border-silat-gold/20 text-[10px] font-bold uppercase text-silat-gold">
                      {tech}
                    </span>
                  ))}
                  {(!result.techniques || result.techniques.length === 0) && (
                    <span className="text-xs opacity-40 italic">Tidak ada teknik terdeteksi</span>
                  )}
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl bg-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="text-silat-gold" size={18} />
                  <h4 className="font-bold uppercase tracking-wider text-xs">{t.techAnalysis}</h4>
                </div>
                <p className="text-sm opacity-70 leading-relaxed italic">
                  "{result.explanation || "Analisis tidak tersedia."}"
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl h-full flex flex-col items-center justify-center text-center gap-4 bg-white/5 border-dashed border-2 border-white/5">
              <Video size={48} className="opacity-10" />
              <p className="text-xs opacity-30 uppercase tracking-widest">{t.videoDesc}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
