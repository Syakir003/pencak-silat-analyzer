import React from 'react';
import { motion } from 'motion/react';
import { Zap, Target, ShieldAlert, Sword, Box } from 'lucide-react';
import { translations } from '../translations';

interface Props {
  lang: 'id' | 'en';
}

export const TechniqueLibrary: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  const techniques = [
    {
      category: t.attacking,
      icon: <Sword className="text-silat-gold" />,
      items: [
        { name: lang === 'id' ? 'Serangan Langsung' : 'Direct Attack', desc: lang === 'id' ? 'Serangan yang dilakukan tanpa ada gerakan awalan yang berarti, langsung menuju sasaran.' : 'Attacks carried out without significant preliminary movement, directly towards the target.' },
        { name: lang === 'id' ? 'Serangan Tidak Langsung' : 'Indirect Attack', desc: lang === 'id' ? 'Serangan yang diawali dengan gerakan tipuan atau pengalihan perhatian lawan.' : 'Attacks preceded by deceptive movements or diverting the opponent\'s attention.' },
      ]
    },
    {
      category: t.defending,
      icon: <ShieldAlert className="text-silat-gold" />,
      items: [
        { name: lang === 'id' ? 'Tangkisan' : 'Parry', desc: lang === 'id' ? 'Usaha pembelaan dengan cara mengadakan kontak langsung dengan serangan lawan.' : 'Defense efforts by making direct contact with the opponent\'s attack.' },
        { name: lang === 'id' ? 'Hindaran' : 'Avoidance', desc: lang === 'id' ? 'Usaha pembelaan dengan cara memindahkan bagian tubuh yang menjadi sasaran.' : 'Defense efforts by moving the body part that is being targeted.' },
      ]
    },
    {
      category: t.punch,
      icon: <Target className="text-silat-gold" />,
      items: [
        { name: lang === 'id' ? 'Pukulan Depan' : 'Straight Punch', desc: lang === 'id' ? 'Lintasan lurus ke depan dengan sasaran dada lawan.' : 'Straight path forward targeting the opponent\'s chest.' },
        { name: lang === 'id' ? 'Pukulan Bandul' : 'Uppercut', desc: lang === 'id' ? 'Pukulan dari bawah ke atas dengan sasaran ulu hati.' : 'Punch from bottom to top targeting the solar plexus.' },
      ]
    },
    {
      category: t.kick,
      icon: <Zap className="text-silat-gold" />,
      items: [
        { name: lang === 'id' ? 'Tendangan Lurus' : 'Front Kick', desc: lang === 'id' ? 'Tendangan menggunakan ujung kaki dengan lintasan lurus.' : 'Kick using the tip of the foot with a straight path.' },
        { name: lang === 'id' ? 'Tendangan Sabit' : 'Roundhouse Kick', desc: lang === 'id' ? 'Tendangan dengan lintasan melingkar seperti sabit.' : 'Kick with a circular path like a sickle.' },
      ]
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-16 space-y-12 px-4">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold neon-text-gold">{t.libraryTitle}</h2>
        <p className="opacity-80">{t.libraryDesc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {techniques.map((tech, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-6 rounded-2xl space-y-6 anim-3d-container"
          >
            <div className="anim-3d-card h-full">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                {tech.icon}
                <h3 className="text-xl font-bold uppercase tracking-wider">{tech.category}</h3>
              </div>
              
              {/* 3D Visual Placeholder */}
              <div className="aspect-video bg-black/10 rounded-xl my-4 overflow-hidden relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-silat-gold/10 to-transparent" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Box size={40} className="text-silat-gold opacity-40" />
                </motion.div>
                <div className="absolute bottom-2 right-2 text-[8px] uppercase tracking-widest opacity-30">
                  {t.visual3d}
                </div>
              </div>

              <div className="space-y-4">
                {tech.items.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <h4 className="font-bold text-silat-gold">{item.name}</h4>
                    <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
