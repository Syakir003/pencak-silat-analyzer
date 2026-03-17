import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Target, 
  Activity, 
  Utensils, 
  Calendar,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { translations } from '../translations';

interface Props {
  result: AnalysisResult;
  lang: 'id' | 'en';
}

export const AnalysisDisplay: React.FC<Props> = ({ result, lang }) => {
  const t = translations[lang];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-5xl mx-auto space-y-8"
    >
      {/* Header Result - Kategori Atlet */}
      <motion.div variants={item} className="glass-panel p-8 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Trophy size={120} className="text-silat-gold" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 bg-silat-gold/20 rounded-2xl flex items-center justify-center border border-silat-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Trophy className="text-silat-gold" size={40} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-silat-gold mb-1">
              {lang === 'id' ? 'Hasil Analisis AI' : 'AI Analysis Result'}
            </p>
            <h3 className="text-4xl font-black tracking-tighter uppercase italic">
              Kategori: <span className="text-silat-gold neon-text-gold">{result.category}</span>
            </h3>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="text-silat-gold shrink-0 mt-1" size={18} />
            <p className="text-sm leading-relaxed opacity-80 font-medium">
              {result.reasoning}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Grid Program & Nutrisi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Program Latihan */}
        <motion.div variants={item} className="glass-panel p-8 rounded-[2rem] space-y-6">
          <div className="flex items-center gap-3 border-b border-silat-gold/10 pb-4">
            <Target className="text-silat-gold" size={24} />
            <h4 className="font-black uppercase tracking-widest text-sm">{t.trainingProgram}</h4>
          </div>
          <div className="prose-custom text-sm leading-relaxed whitespace-pre-line opacity-80">
            {result.trainingProgram}
          </div>
        </motion.div>

        {/* Jadwal Latihan Beban */}
        <motion.div variants={item} className="glass-panel p-8 rounded-[2rem] space-y-6 bg-gradient-to-br from-silat-gold/5 to-transparent">
          <div className="flex items-center gap-3 border-b border-silat-gold/10 pb-4">
            <Calendar className="text-silat-gold" size={24} />
            <h4 className="font-black uppercase tracking-widest text-sm">{t.powerSchedule}</h4>
          </div>
          <div className="space-y-3">
            {result.powerSchedule.split('\n').map((line, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm font-medium">
                {line.trim() && (
                  <>
                    <ChevronRight size={14} className="text-silat-gold" />
                    <span className="opacity-80">{line}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rencana Nutrisi */}
        <motion.div variants={item} className="glass-panel p-8 rounded-[2rem] lg:col-span-2 flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/3 space-y-4">
            <div className="flex items-center gap-3">
              <Utensils className="text-silat-gold" size={24} />
              <h4 className="font-black uppercase tracking-widest text-sm">{t.nutritionPlan}</h4>
            </div>
            <p className="text-xs opacity-50 font-medium italic">
              {lang === 'id' 
                ? "*Rekomendasi asupan nutrisi berdasarkan berat & tinggi badan Anda." 
                : "*Nutritional recommendations based on your weight & height."}
            </p>
          </div>
          <div className="md:w-2/3 p-6 bg-silat-gold/5 rounded-2xl border border-silat-gold/10">
            <div className="prose-custom text-sm leading-relaxed whitespace-pre-line opacity-90 font-medium">
              {result.nutritionPlan}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Button Download / Share Placeholder */}
      <motion.div variants={item} className="text-center pt-8">
        <button 
          onClick={() => window.print()}
          className="px-8 py-3 bg-silat-gold text-white font-black uppercase text-[10px] tracking-[0.3em] rounded-full hover:neon-glow-gold transition-all duration-300"
        >
          {lang === 'id' ? 'Unduh Laporan Analisis' : 'Download Analysis Report'}
        </button>
      </motion.div>
    </motion.div>
  );
};
