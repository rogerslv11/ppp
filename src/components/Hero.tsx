import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Phone, ArrowRight, Shield, Award, Users } from 'lucide-react';
import { StatItem } from '../types';
import assets from '../data/assets.json';

interface HeroProps {
  onCtaClick: (id: string) => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = assets.hero;


  const stats: StatItem[] = [
    { value: '20+', label: 'Anos na Construção', suffix: '' },
    { value: '500+', label: 'Obras Entregues', suffix: '' },
    { value: '100%', label: 'Impermeabilização Garantida', suffix: '' },
    { value: 'CREA-RS', label: 'Responsabilidade Técnica (ART)', suffix: '' },
  ];

  // Auto slide effect
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6500);
    return () => clearInterval(slideTimer);
  }, [heroImages.length]);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-12 sm:pb-20">
      {/* Dynamic Background Image Slider (Ken Burns premium zoom-in) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.03 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 6.5, ease: 'linear' }
            }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImages[currentSlide]}')` }}
          />
        </AnimatePresence>
        
        {/* Multilayer premium dark blue & deep slate ambient overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-dark/45 to-transparent" />
        
        {/* Animated aquatic wave background pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden z-10 select-none pointer-events-none">
          <svg className="absolute bottom-0 w-full h-12 text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,90 350,10 500,60 C650,110 850,20 1000,70 C1150,120 1250,50 1300,30 L1300,120 L0,120 Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex items-center">
        <div className="max-w-3xl pt-8 sm:pt-16 pb-6">
          {/* Trust Seal */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-slate-950/60 border border-white/10 backdrop-blur-xl mb-8 shadow-xl hover:border-blue-500/20 transition-all duration-300 cursor-default"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-100 font-mono uppercase">
              Especialista em Impermeabilização de Elite
            </span>
          </motion.div>

          {/* Core Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-4xl sm:text-5.5xl lg:text-6.5xl text-white tracking-tight leading-[1.1]"
          >
            Sua Piscina Sempre <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-200 to-white font-black pb-1 inline-block">
              Segura, Impermeabilizada & Linda
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-sm sm:text-base lg:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl"
          >
            Especialistas em reformas estruturais de piscinas, impermeabilização com fibra de vidro, correção de vazamentos graves e revitalização especializada com garantia contratual.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              onClick={() => onCtaClick('contato')}
              className="flex items-center justify-center gap-2.5 px-8 py-4.5 text-xs sm:text-sm font-bold text-white bg-primary hover:bg-primary-dark shadow-xl shadow-primary/20 hover:shadow-primary/40 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
            >
              <Calendar className="w-5 h-5 text-accent group-hover:rotate-6 transition-transform" />
              <span>Solicitar Avaliação Técnica</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://wa.me/5551999999999?text=Ol%C3%A1%21+Gostaria+de+solicitar+um+or%C3%A7amento+especialista+para+reforma+ou+impermeabiliza%C3%A7%C3%A3o+de+piscina."
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center justify-center gap-2.5 px-8 py-4.5 text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-50 border border-white hover:border-slate-100 shadow-lg hover:-translate-y-0.5 active:translate-y-0 rounded-2xl transition-all duration-300 group"
            >
              <Phone className="w-5 h-5 text-emerald-500 fill-emerald-500/20 group-hover:scale-110 transition-transform" />
              <span>Falar com Especialista</span>
            </a>
          </motion.div>

          {/* Quick trust flags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-6 text-slate-400 font-medium text-xs"
          >
            <div className="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-default">
              <div className="w-6 h-6 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Award className="w-3.5 h-3.5 text-accent" />
              </div>
              <span>Laudo de Impermeabilização com ART</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-default">
              <div className="w-6 h-6 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Users className="w-3.5 h-3.5 text-accent" />
              </div>
              <span>Equipe Técnica Própria Certificada</span>
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  );
}
