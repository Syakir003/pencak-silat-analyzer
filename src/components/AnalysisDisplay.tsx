import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Calendar, Utensils, ShieldCheck, ChevronRight } from 'lucide-react';
import { AnalysisResult } from '../types';
import { translations } from '../translations';

export const AnalysisDisplay: React.FC<{ result: AnalysisResult, lang: 'id' | 'en' }> = ({ result, lang }) => {
  const t = translations[lang];

  // Fungsi pengaman untuk split teks
  const safeSplit = (text: string | undefined | null) => {
    if (!text) return [];
    return text.split('\n').filter(line => line.trim() !== "");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl mx-auto space-y-6 mt-10 p-4">
      {/* Kategori Card */}
      <div className="glass-panel p-8 rounded-[2rem] relative overflow-hidden bg-gradient-to-br from-silat-gold/5 to-transparent">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-silat-gold rounded-xl flex items-center justify-center shadow-lg shadow-silat-gold/20">
            <Trophy className="text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black tracking-widest text-silat-gold uppercase">Hasil Analisis Pendekar</p>
            <h3 className="text-3xl font-black uppercase italic neon-text-gold">{result?.category || "Analisis Selesai"}</h3>
          </div>
        </div>
        <div className="mt-6 p-4 bg-black/5 dark:bg-white/5 rounded-xl text-sm border border-white/10 opacity-80 leading-relaxed">
          <ShieldCheck size={14} className="inline mr-2 text-silat-gold"/>
          {result?.reasoning || "Analisis berhasil diproses oleh sistem."}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Program Latihan */}
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4 text-silat-gold">
            <Target size={18}/>
            <h4 className="text-xs font-black uppercase tracking-widest">{t.trainingProgram}</h4>
          </div>
          <p className="text-sm opacity-70 whitespace-pre-line leading-relaxed">
            {result?.trainingProgram || "Program latihan sedang disiapkan."}
          </p>
        </div>

        {/* Jadwal Latihan Beban - PROTEKSI SPLIT */}
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4 text-silat-gold">
            <Calendar size={18}/>
            <h4 className="text-xs font-black uppercase tracking-widest">{t.powerSchedule}</h4>
          </div>
          <div className="space-y-3">
            {safeSplit(result?.powerSchedule).length > 0 ? (
              safeSplit(result?.powerSchedule).map((line, i) => (
                <div key={i} className="flex gap-3 text-xs opacity-80">
                  <ChevronRight size={14} className="text-silat-gold shrink-0" />
                  <span>{line}</span>
                </div>
              ))
            ) : (
              <p className="text-xs opacity-40 italic">Jadwal tidak tersedia atau dalam format teks biasa.</p>
            )}
          </div>
        </div>

        {/* Nutrisi */}
        <div className="glass-panel p-6 rounded-2xl md:col-span-2 flex flex-col md:flex-row gap-6 items-start">
          <div className="md:w-1/4 flex items-center gap-2 text-silat-gold shrink-0">
            <Utensils size={18}/>
            <h4 className="text-xs font-black uppercase tracking-widest">{t.nutritionPlan}</h4>
          </div>
          <div className="md:w-3/4 text-sm opacity-70 p-4 bg-silat-gold/5 rounded-xl border border-silat-gold/10 leading-relaxed italic">
            "{result?.nutritionPlan || "Rencana nutrisi belum digenerate."}"
          </div>
        </div>
      </div>
    </motion.div>
  );
};
