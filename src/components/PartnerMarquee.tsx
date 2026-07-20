import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles } from 'lucide-react';

import partners from '../data/partners.json';

// Doubling the array for seamless loop
const marqueePartners = [...partners, ...partners, ...partners];

export default function PartnerMarquee() {
  return (
    <section id="parceiros" className="py-24 bg-white overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 mb-6"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Portfólio de Confiança</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight"
          >
            Nossos Parceiros e Clientes
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Temos o orgulho de colaborar com as maiores referências do mercado imobiliário e condominial do Rio Grande do Sul.
          </motion.p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-x-hidden group py-8">
        <motion.div 
          animate={{
            x: [0, -100 + '%']
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap gap-12 pr-12"
        >
          {marqueePartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex flex-col items-center justify-center w-[260px] grayscale hover:grayscale-0 opacity-65 hover:opacity-100 transition-all duration-500"
            >
              <div className="w-full h-[180px] rounded-2xl overflow-hidden border border-slate-100 shadow-md bg-slate-50">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest text-center mt-2.5">
                {partner.name} — {partner.category}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Gradient Fades for Smooth Transitions */}
        <div className="absolute top-0 left-0 w-48 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Certification Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold text-slate-500 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            MAIS DE 500 CONDOMÍNIOS ATENDIDOS
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold text-slate-500 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            PARCEIRO TÉCNICO HOMOLOGADO
          </div>
        </motion.div>
      </div>
    </section>
  );
}
