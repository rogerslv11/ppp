import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2,
  WandSparkles,
  Shield,
  Drill,
  BrickWall,
  Container,
  Gauge,
  Layers,
  ArrowRight, 
  X, 
  CheckCircle2, 
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import { servicesData } from '../mockData';

const gradients = [
  { from: 'from-blue-600', to: 'to-cyan-500', badge: 'bg-blue-500/20 text-blue-100 border-blue-400/30' },
  { from: 'from-emerald-600', to: 'to-teal-500', badge: 'bg-emerald-500/20 text-emerald-100 border-emerald-400/30' },
  { from: 'from-violet-600', to: 'to-purple-500', badge: 'bg-violet-500/20 text-violet-100 border-violet-400/30' },
  { from: 'from-rose-600', to: 'to-pink-500', badge: 'bg-rose-500/20 text-rose-100 border-rose-400/30' },
  { from: 'from-amber-600', to: 'to-orange-500', badge: 'bg-amber-500/20 text-amber-100 border-amber-400/30' },
  { from: 'from-indigo-600', to: 'to-blue-500', badge: 'bg-indigo-500/20 text-indigo-100 border-indigo-400/30' },
  { from: 'from-cyan-600', to: 'to-sky-500', badge: 'bg-cyan-500/20 text-cyan-100 border-cyan-400/30' },
  { from: 'from-slate-700', to: 'to-slate-500', badge: 'bg-slate-500/20 text-slate-100 border-slate-400/30' },
];

const getServiceBadge = (id: number) => {
  switch (id) {
    case 1: return "ESTRUTURAL";
    case 2: return "RESTAURAÇÃO";
    case 3: return "IMPERMEABILIZAÇÃO";
    case 4: return "DIAGNÓSTICO";
    case 5: return "CONCRETO ARMADO";
    case 6: return "SISTEMAS COLETIVOS";
    case 7: return "HIDRÁULICA PREMIUM";
    case 8: return "DESIGN EXTERNO";
    default: return "ENGENHARIA";
  }
};

const renderIcon = (iconName: string, size = 'w-4.5 h-4.5') => {
  const props = { className: size };
  switch (iconName) {
    case 'Building2': return <Building2 {...props} />;
    case 'WandSparkles': return <WandSparkles {...props} />;
    case 'Shield': return <Shield {...props} />;
    case 'Drill': return <Drill {...props} />;
    case 'BrickWall': return <BrickWall {...props} />;
    case 'Container': return <Container {...props} />;
    case 'Gauge': return <Gauge {...props} />;
    case 'Layers': return <Layers {...props} />;
    default: return <Building2 {...props} />;
  }
};

function ServiceCard({ service, onClick }: { service: typeof servicesData[0]; onClick: () => void }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const g = gradients[(service.id - 1) % gradients.length];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.015 : 1}, ${isHovered ? 1.015 : 1}, 1)`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        transformStyle: 'preserve-3d',
      }}
      className="group relative bg-white rounded-3xl border border-slate-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-blue-500/5 cursor-pointer flex flex-col overflow-hidden h-full"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 0.5 : 0,
          background: `radial-gradient(circle 140px at ${coords.x}px ${coords.y}px, rgba(14, 165, 233, 0.12), transparent 85%)`,
        }}
      />

      <div className={`relative bg-gradient-to-br ${g.from} ${g.to} px-5 pt-8 pb-12 shrink-0`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />

        <span className={`relative z-10 inline-block text-[8.5px] font-mono tracking-widest font-bold px-2.5 py-1 rounded-lg border ${g.badge} shadow-sm`}>
          {getServiceBadge(service.id)}
        </span>

        <div className="relative z-10 mt-6 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            {renderIcon(service.iconName, 'w-8 h-8')}
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow px-5 pt-5 pb-5 relative z-20" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-primary transition-colors leading-snug">
          {service.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 mt-2.5 line-clamp-3 leading-relaxed flex-grow">
          {service.description}
        </p>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
            Plano Técnico
          </span>
          <div className="flex items-center gap-2 px-4.5 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-blue-500/10 group-hover:from-primary group-hover:to-blue-600 border border-primary/20 group-hover:border-primary text-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:shadow-primary/25 font-bold text-xs">
            <span>Ver mais</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="servicos" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none" 
        style={{ 
          backgroundImage: `
            radial-gradient(#0077FF 1.5px, transparent 1.5px),
            linear-gradient(to right, rgba(0,119,255,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,119,255,0.15) 1px, transparent 1px)
          `, 
          backgroundSize: '32px 32px, 160px 160px, 160px 160px' 
        }} 
      />

      <div className="absolute top-1/4 -right-40 w-[400px] h-[400px] bg-blue-100/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[450px] h-[450px] bg-cyan-100/25 rounded-full filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 gsap-reveal">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase font-mono px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            Nossos Serviços
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4.5xl text-slate-900 tracking-tight mt-6 leading-none">
            Tratamentos e Soluções Sob Medida
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-5 mx-auto" />
          <p className="text-slate-500 text-sm sm:text-base mt-5 leading-relaxed">
            Unimos o melhor da engenharia estrutural com as tecnologias de impermeabilização e revitalização mais modernas do mercado para entregar impermeabilização real e duradoura.
          </p>
        </div>

        <div className="relative group/swiper mt-8 sm:mt-12">
          <div className="absolute top-1/2 -left-4 sm:-left-6 -translate-y-1/2 z-30 transition-all duration-300 opacity-0 group-hover/swiper:opacity-100 pointer-events-none hidden md:flex">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200/80 shadow-lg text-slate-600 hover:text-primary hover:border-primary/50 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 z-30 transition-all duration-300 opacity-0 group-hover/swiper:opacity-100 pointer-events-none hidden md:flex">
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200/80 shadow-lg text-slate-600 hover:text-primary hover:border-primary/50 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 32,
              },
            }}
            className="pb-14 !px-4 -mx-4"
          >
            {servicesData.map((service) => (
              <SwiperSlide key={service.id} className="h-auto py-4">
                <ServiceCard 
                  service={service}
                  onClick={() => setSelectedService(service)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-3.5xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
              >
                {(() => {
                  const g = gradients[(selectedService.id - 1) % gradients.length];
                  return (
                    <>
                      <div className={`relative bg-gradient-to-br ${g.from} ${g.to} px-6 sm:px-8 pt-10 pb-12`}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />

                        <button
                          onClick={() => setSelectedService(null)}
                          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer z-20"
                        >
                          <X className="w-5 h-5" />
                        </button>

                        <div className="relative z-10 flex items-center gap-5">
                          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white shadow-lg shrink-0">
                            {renderIcon(selectedService.iconName, 'w-8 h-8')}
                          </div>
                          <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-white/80 bg-white/10 border border-white/20 backdrop-blur-md">
                              Plano Técnico
                            </span>
                            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-2">
                              {selectedService.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 sm:p-8 space-y-6">
                        <div>
                          <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">
                            O que está incluso no escopo
                          </h4>
                          <p className="text-slate-600 mt-2.5 leading-relaxed text-sm sm:text-base">
                            {selectedService.detail}
                          </p>
                        </div>

                        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                            <span>Produtos Inclusos na Visita</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                            <span>Limpeza Química e Física</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                            <span>Relatório Digital Integrado</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                            <span>Suporte e Retorno Garantido</span>
                          </div>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                          <a
                            href={`https://wa.me/5511999999999?text=Ol%C3%A1%21+Gostaria+de+saber+mais+detalhes+sobre+o+servi%C3%A7o+de+${encodeURIComponent(selectedService.title)}.`}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md shadow-green-500/10 text-white font-bold rounded-2xl transition-all duration-200 text-center"
                          >
                            <MessageSquare className="w-5 h-5" />
                            <span>Contratar via WhatsApp</span>
                          </a>
                          
                          <button
                            onClick={() => setSelectedService(null)}
                            className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition-all duration-200 cursor-pointer text-center"
                          >
                            Voltar aos Serviços
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
