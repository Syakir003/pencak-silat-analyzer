import React from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Award, Dumbbell, Calendar, Apple } from 'lucide-react';
import { AnalysisResult } from '../types';
import { translations } from '../translations';

interface Props {
  result: AnalysisResult;
  lang: 'id' | 'en';
}

export const AnalysisDisplay: React.FC<Props> = ({ result, lang }) => {
  const t = translations[lang];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 w-full max-w-4xl mx-auto mt-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass-panel p-6 rounded-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Award size={80} />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-silat-gold" />
            <h3 className="text-xl font-bold text-silat-gold uppercase tracking-wider">{t.categoryRec}</h3>
          </div>
          <div className="text-4xl font-black mb-4 neon-text-gold">
            {result.category === 'Fighter' ? (lang === 'id' ? 'TANDING' : 'FIGHTER') : (lang === 'id' ? 'SENI' : 'ART')}
          </div>
          <p className="opacity-80 leading-relaxed">{result.reasoning}</p>
        </motion.div>

        {/* Nutrition Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass-panel p-6 rounded-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Apple size={80} />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Apple className="text-silat-gold" />
            <h3 className="text-xl font-bold text-silat-gold uppercase tracking-wider">{t.nutrition}</h3>
          </div>
          <div className="prose prose-custom max-w-none">
            <ReactMarkdown>{result.nutritionPlan}</ReactMarkdown>
          </div>
        </motion.div>
      </div>

      {/* Training Program */}
      <div className="glass-panel p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Dumbbell className="text-silat-gold" />
          <h3 className="text-2xl font-bold neon-text-gold">{t.trainingProgram}</h3>
        </div>
        <div className="prose prose-custom max-w-none">
          <ReactMarkdown>{result.trainingProgram}</ReactMarkdown>
        </div>
      </div>

      {/* Power Schedule */}
      <div className="glass-panel p-8 rounded-2xl border-l-4 border-l-silat-gold">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="text-silat-gold" />
          <h3 className="text-2xl font-bold text-silat-gold">{t.powerSchedule}</h3>
        </div>
        <div className="prose prose-custom max-w-none">
          <ReactMarkdown>{result.powerSchedule}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};
