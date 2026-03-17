import React from 'react';
import { motion } from 'motion/react';
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

    setLoading(true);
    setVideoPreview(URL.createObjectURL(file));

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const analysis = await analyzeVideo(base64, file.type, lang);
        setResult(analysis);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Video analysis error:', error);
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
          <div className="glass-panel p-4 rounded-2xl aspect-video relative flex items-center justify-center overflow-hidden border-dashed border-2 border-black/10 dark:border-white/10">
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
          
          {!videoPreview && (
            <div className="flex items-center gap-2 text-xs opacity-40 justify-center">
              <Info size={14} />
              <span>Format: MP4, MOV, AVI (Max 20MB)</span>
            </div>
          )}
        </div>

        {/* Results Area */}
        <div className="space-y-6">
          {loading ? (
            <div className="glass-panel p-8 rounded-2xl h-full flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-silat-gold/30 border-t-silat-gold rounded-full animate-spin" />
              <p className="text-silat-gold animate-pulse font-mono uppercase text-xs tracking-widest">{t.analyzing}</p>
            </div>
          ) : result ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-4 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-silat-gold/10 rounded-lg">
                    <Zap className="text-silat-gold" size={20} />
                  </div>
                  <div>
                    <div className="text-xs opacity-50 uppercase">{t.punches}</div>
                    <div className="text-2xl font-bold">{result.punches}</div>
                  </div>
                </div>
                <div className="glass-panel p-4 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-silat-gold/10 rounded-lg">
                    <Zap className="text-silat-gold" size={20} />
                  </div>
                  <div>
                    <div className="text-xs opacity-50 uppercase">{t.kicks}</div>
                    <div className="text-2xl font-bold">{result.kicks}</div>
                  </div>
                </div>
              </div>

              {/* 3D Replay Placeholder */}
              <div className="glass-panel p-6 rounded-2xl border-silat-gold/50 bg-gradient-to-br from-silat-gold/5 to-transparent">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Box className="text-silat-gold" size={18} />
                    <h4 className="font-bold uppercase tracking-wider text-sm">{t.replay3d}</h4>
                  </div>
                  <span className="text-[8px] px-2 py-1 rounded-full bg-silat-gold text-white font-bold uppercase">Beta</span>
                </div>
                <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center relative overflow-hidden anim-3d-container">
                  <motion.div 
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-48 bg-silat-gold/20 border border-silat-gold/40 rounded-full blur-xl absolute"
                  />
                  <div className="z-10 text-center space-y-2">
                    <Box size={32} className="mx-auto text-silat-gold animate-bounce" />
                    <p className="text-[10px] opacity-60 uppercase tracking-widest">{t.visual3d}</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Hash className="text-silat-gold" size={18} />
                  <h4 className="font-bold uppercase tracking-wider text-sm">{t.techDetected}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.techniques.map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="text-silat-gold" size={18} />
                  <h4 className="font-bold uppercase tracking-wider text-sm">{t.techAnalysis}</h4>
                </div>
                <p className="text-sm opacity-70 leading-relaxed">
                  {result.explanation}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl h-full flex flex-col items-center justify-center text-center gap-4 opacity-50">
              <Video size={48} className="opacity-30" />
              <p className="opacity-40">{t.videoDesc}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
