import React from 'react';
import { motion } from 'motion/react';
import { Target, User, Activity, Scale, Ruler } from 'lucide-react';
import { AthleteData } from '../types';
import { translations } from '../translations';

interface Props {
  onSubmit: (data: AthleteData) => void;
  loading: boolean;
  lang: 'id' | 'en';
}

export const AthleteForm: React.FC<Props> = ({ onSubmit, loading, lang }) => {
  const t = translations[lang];
  const [formData, setFormData] = React.useState<AthleteData>({
    name: '',
    age: 0,
    weight: 0,
    height: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-8 rounded-2xl w-full max-w-2xl mx-auto relative overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-8">
        <Target className="text-silat-gold w-8 h-8" />
        <h2 className="text-2xl font-bold neon-text-gold">{t.profileTitle}</h2>
      </div>

      {loading && (
        <motion.div
          initial={{ top: 0 }}
          animate={{ top: '100%' }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-silat-gold to-transparent z-20 shadow-[0_0_15px_rgba(212,175,55,0.8)]"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm opacity-60 flex items-center gap-2">
              <User size={16} /> {t.nameLabel}
            </label>
            <input
              required
              type="text"
              placeholder="..."
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-3 focus:border-silat-gold outline-none transition-all"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm opacity-60 flex items-center gap-2">
              <Activity size={16} /> {t.ageLabel}
            </label>
            <input
              required
              type="number"
              placeholder="..."
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-3 focus:border-silat-gold outline-none transition-all"
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm opacity-60 flex items-center gap-2">
              <Scale size={16} /> {t.weightLabel}
            </label>
            <input
              required
              type="number"
              placeholder="..."
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-3 focus:border-silat-gold outline-none transition-all"
              onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm opacity-60 flex items-center gap-2">
              <Ruler size={16} /> {t.heightLabel}
            </label>
            <input
              required
              type="number"
              placeholder="..."
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-3 focus:border-silat-gold outline-none transition-all"
              onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
            />
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-silat-gold p-4 rounded-xl font-bold text-white hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-silat-gold/20"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            t.analyzeBtn
          )}
        </button>
      </form>
    </motion.div>
  );
};
