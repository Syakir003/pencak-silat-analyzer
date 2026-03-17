import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Cpu, Zap, Sun, Moon, Languages, User, Video, Loader2 } from 'lucide-react';
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

  // Dark Mode Management
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleAthleteSubmit = async (data: AthleteData) => {
    setLoading(true);
    setAnalysis(null); // Reset UI agar perfeksionis
    try {
      const result = await analyzeAthlete(data, lang);
      setAnalysis(result);
      
      // Auto-scroll ke hasil analisis setelah selesai
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Analysis error:', error);
      alert(lang === 'id' ? 'Koneksi ke AI gagal. Periksa koneksi internet atau API Anda.' : 'AI Connection failed. Check your internet or API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden transition-colors duration-500 bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white">
      {/* Background Decor - Elegan & Deep */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-silat-gold/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-silat-gold/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Loading Overlay Global */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/70 dark:bg-black/80 backdrop-blur-xl"
          >
            <div className="relative mb-6">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-4 border-silat-gold/20 border-t-silat-gold rounded-full"
              />
              <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-silat-gold" size={32} />
            </div>
            <motion.p 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-silat-gold font-black tracking-[0.3em] text-xs uppercase"
            >
              {lang === 'id' ? 'Menganalisis Data Pendekar...' : 'Analyzing Warrior Data...'}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="relative z-50 p-6 flex items-center justify-between max-w-7xl mx-auto backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-14 h-14 bg-gradient-to-br from-silat-gold to-yellow-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-silat-gold/40 border border-white/30"
          >
            <Shield className="text-white" size={28} />
          </motion.div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-silat-gold to-yellow-500">
              {t.title}
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold">{t.subtitle}</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-widest">
          {[
            { id: 'profile', icon: <User size={14} />, label: t.athleteAnalysis },
            { id: 'video', icon: <Video size={14} />, label: t.videoAnalysis },
            { id: 'library', icon: <Shield size={14} />, label: t.materiTeknik }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-2 transition-all duration-300 relative py-2 ${
                activeTab === item.id ? 'text-silat-gold opacity-100' : 'opacity-40 hover:opacity-100'
              }`}
            >
              {item.icon} {item.label}
              {activeTab === item.id && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-silat-gold" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-silat-gold transition-all text-[11px] font-bold"
          >
            <Languages size={14} /> {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-silat-gold transition-all"
          >
            {isDark ? <Sun size={20} className="text-silat-gold" /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-silat-gold/10 border border-silat-gold/20 text-silat-gold text-[10px] font-black uppercase tracking-[0.4em] mb-6"
          >
            <Zap size={14} className="fill-current" /> AI Powered Martial Arts
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-8"
          >
            {t.heroTitle} <br />
            <span className="text-silat-gold italic">{t.heroSubtitle}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="opacity-60 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed"
          >
            {t.heroDesc}
          </motion.p>
        </div>

        {/* Mobile Tab Icons */}
        <div className="flex lg:hidden justify-center gap-2 mb-12">
          {['profile', 'video', 'library'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`p-4 rounded-2xl border transition-all ${
                activeTab === tab 
                ? 'bg-silat-gold border-silat-gold text-white shadow-xl shadow-silat-gold/30' 
                : 'bg-white/5 border-black/10 dark:border-white/10 opacity-60'
              }`}
            >
              {tab === 'profile' && <User size={20} />}
              {tab === 'video' && <Video size={20} />}
              {tab === 'library' && <Shield size={20} />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
            >
              {activeTab === 'profile' && (
                <div className="space-y-16">
                  <AthleteForm onSubmit={handleAthleteSubmit} loading={loading} lang={lang} />
                  {analysis && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                      <AnalysisDisplay result={analysis} lang={lang} />
                    </motion.div>
                  )}
                </div>
              )}
              {activeTab === 'video' && <VideoAnalysisSection lang={lang} />}
              {activeTab === 'library' && <TechniqueLibrary lang={lang} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="mt-32 border-t border-black/5 dark:border-white/5 py-12 text-center relative z-10">
        <div className="flex justify-center gap-12 mb-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          <Zap size={24} />
          <Shield size={24} />
          <Cpu size={24} />
        </div>
        <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.6em]">
          &copy; 2024 S1 IKOR UNESA • ARS INTEGRATION • ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
}
