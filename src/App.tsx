import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Cpu, Zap, Sun, Moon, Languages, User, Video } from 'lucide-react';
import { AthleteForm } from './components/AthleteForm';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { VideoAnalysisSection } from './components/VideoAnalysisSection';
import { TechniqueLibrary } from './components/TechniqueLibrary';
import { analyzeAthlete } from './services/gemini';
import { AthleteData, AnalysisResult } from './types';
import { translations } from './translations';

export default function App() {
  const [loading, setLoading] = React.useState(false);
  const [analysis, setAnalysis] = React.useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = React.useState<'profile' | 'video' | 'library'>('profile');
  const [isDark, setIsDark] = React.useState(false);
  const [lang, setLang] = React.useState<'id' | 'en'>('id');

  const t = translations[lang];

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleAthleteSubmit = async (data: AthleteData) => {
    setLoading(true);
    try {
      const result = await analyzeAthlete(data, lang);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden transition-colors duration-300">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-silat-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-silat-gold/5 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-silat-gold to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-silat-gold/30 border border-white/20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Shield className="text-white" size={24} />
            </motion.div>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tighter neon-text-gold">
              {t.title}
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-bold">{t.subtitle}</p>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest opacity-60">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 hover:text-silat-gold transition-colors ${activeTab === 'profile' ? 'text-silat-gold opacity-100' : ''}`}
          >
            <User size={14} /> {t.athleteAnalysis}
          </button>
          <button 
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 hover:text-silat-gold transition-colors ${activeTab === 'video' ? 'text-silat-gold opacity-100' : ''}`}
          >
            <Video size={14} /> {t.videoAnalysis}
          </button>
          <button 
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 hover:text-silat-gold transition-colors ${activeTab === 'library' ? 'text-silat-gold opacity-100' : ''}`}
          >
            <Shield size={14} /> {t.materiTeknik}
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-silat-gold transition-all text-[10px] font-bold"
          >
            <Languages size={16} />
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-silat-gold transition-all"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 rounded-full border border-black/10 dark:border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono opacity-60 uppercase">{t.systemOnline}</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-silat-gold/10 border border-silat-gold/20 text-silat-gold text-[10px] font-bold uppercase tracking-[0.3em]"
          >
            <Zap size={14} /> TECHNOLOGY INTEGRATION
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
            {t.heroTitle} <br />
            <span className="text-silat-gold neon-text-gold">{t.heroSubtitle}</span>
          </h2>
          <p className="opacity-60 max-w-2xl mx-auto text-lg font-medium">
            {t.heroDesc}
          </p>
        </div>

        {/* Tab Navigation Mobile */}
        <div className="flex lg:hidden justify-center flex-wrap gap-2 mb-8">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-bold uppercase border transition-all ${activeTab === 'profile' ? 'bg-silat-gold text-white border-silat-gold' : 'border-black/10 dark:border-white/10 opacity-60'}`}
          >
            <User size={12} /> {t.athleteAnalysis}
          </button>
          <button 
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-bold uppercase border transition-all ${activeTab === 'video' ? 'bg-silat-gold text-white border-silat-gold' : 'border-black/10 dark:border-white/10 opacity-60'}`}
          >
            <Video size={12} /> {t.videoAnalysis}
          </button>
          <button 
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-bold uppercase border transition-all ${activeTab === 'library' ? 'bg-silat-gold text-white border-silat-gold' : 'border-black/10 dark:border-white/10 opacity-60'}`}
          >
            <Shield size={12} /> {t.materiTeknik}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              <AthleteForm onSubmit={handleAthleteSubmit} loading={loading} lang={lang} />
              {analysis && <AnalysisDisplay result={analysis} lang={lang} />}
            </motion.div>
          )}
          {activeTab === 'video' && (
            <motion.div
              key="video"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <VideoAnalysisSection lang={lang} />
            </motion.div>
          )}
          {activeTab === 'library' && (
            <motion.div
              key="library"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <TechniqueLibrary lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Decoration */}
      <footer className="mt-20 border-t border-black/5 dark:border-white/5 p-8 text-center">
        <div className="flex justify-center gap-8 mb-4 opacity-20">
          <Zap size={20} />
          <Shield size={20} />
          <Cpu size={20} />
        </div>
        <p className="text-[10px] opacity-40 uppercase tracking-[0.5em]">
          &copy; 2024 S1 IKOR UNESA. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}
