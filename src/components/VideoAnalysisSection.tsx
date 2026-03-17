import React from 'react';
import { motion } from 'motion/react';
import { Upload, Video, Zap, Hash, Info } from 'lucide-react';
import { analyzeVideo } from '../services/gemini';
import { VideoAnalysisResult } from '../types';
import { translations } from '../translations';

export const VideoAnalysisSection: React.FC<{ lang: 'id' | 'en' }> = ({ lang }) => {
  const t = translations[lang];
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<VideoAnalysisResult | null>(null);
  const [videoPreview, setVideoPreview] = React.useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) return alert("Maksimal 25MB");

    setLoading(true);
    setResult(null);
    setVideoPreview(URL.createObjectURL(file));

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const data = await analyzeVideo(base64, file.type, lang);
        setResult(data);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 space-y-8 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Side */}
        <div className="space-y-4">
          <div className="relative aspect-video bg-black/5 dark:bg-white/5 rounded-3xl border-2 border-dashed border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden">
            {videoPreview ? (
              <video src={videoPreview} controls className="w-full h-full object-cover" />
            ) : (
              <label className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="text-silat-gold" />
                <span className="text-xs font-bold opacity-40 uppercase tracking-widest">{t.selectVideo}</span>
                <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
              </label>
            )}
            {loading && <motion.div animate={{ y: [0, 200] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute top-0 left-0 right-0 h-1 bg-silat-gold shadow-[0_0_15px_gold] z-10" />}
          </div>
        </div>

        {/* Result Side */}
        <div className="space-y-6">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center animate-pulse opacity-50">
              <Zap className="text-silat-gold mb-2" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">{t.analyzing}</p>
            </div>
          ) : result ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[10px] opacity-50 uppercase font-black">{t.punches}</p>
                  <p className="text-3xl font-black text-silat-gold">{result.punches || 0}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[10px] opacity-50 uppercase font-black">{t.kicks}</p>
                  <p className="text-3xl font-black text-silat-gold">{result.kicks || 0}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Hash size={14} className="text-silat-gold" />
                  <p className="text-[10px] font-black uppercase tracking-widest">{t.techDetected}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* GUARD: Menggunakan (result.techniques || []) */}
                  {(result.techniques || []).map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-silat-gold/10 text-silat-gold rounded-full text-[10px] font-bold border border-silat-gold/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={14} className="text-silat-gold" />
                  <p className="text-[10px] font-black uppercase tracking-widest">{t.techAnalysis}</p>
                </div>
                <p className="text-sm opacity-70 leading-relaxed italic">"{result.explanation}"</p>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center opacity-20 italic text-sm">
              Menunggu unggahan video...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
