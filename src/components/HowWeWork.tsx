import { motion } from 'motion/react';
import { ClipboardSignature, Search, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HowWeWork() {
  const steps = [
    {
      number: '01',
      title: 'Contato & Pré-Diagnóstico',
      focus: 'Análise Rápida',
      duration: 'Retorno em minutos',
      description: 'Análise ágil de dimensões e análise inicial de imagens/vídeos via WhatsApp ou formulário integrado.',
      icon: <ClipboardSignature className="w-5 h-5" />,
      color: 'from-blue-500 to-indigo-600 shadow-blue-500/10 text-blue-500 bg-blue-50/50 border-blue-100'
    },
    {
      number: '02',
      title: 'Visita Técnica Gratuita',
      focus: 'Diagnóstico Especializado',
      duration: 'Agendamento Flexível',
      description: 'Nossa equipe qualificada inspeciona patologias do concreto, fissuras estruturais e faz testes de impermeabilização hidráulica.',
      icon: <Search className="w-5 h-5" />,
      color: 'from-cyan-500 to-blue-600 shadow-cyan-500/10 text-cyan-600 bg-cyan-50/50 border-cyan-100'
    },
    {
      number: '03',
      title: 'Execução de Elite',
      focus: 'Alto Padrão Técnico',
      duration: 'Cronograma Estrito',
      description: 'Intervenções limpas, aplicação de resinas puras, revestimento reforçado com fibra de vidro ou pastilhas nobres.',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'from-blue-600 to-primary shadow-blue-600/10 text-primary bg-primary/5 border-primary/10'
    },
    {
      number: '04',
      title: 'Impermeabilização & Garantia',
      focus: 'Segurança Contratual',
      duration: 'Garantia de Longo Prazo',
      description: 'Enchimento assistido, 72h de teste estático monitorado, laudo técnico com emissão de ART e termo contratual de garantia.',
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: 'from-emerald-500 to-teal-600 shadow-emerald-500/10 text-emerald-600 bg-emerald-50/50 border-emerald-100'
    }
  ];

  return (
    <section id="como-trabalhamos" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Blueprint grid background */}
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

      {/* Decorative Blur Background Bubbles */}
      <div className="absolute top-1/4 -left-40 w-[400px] h-[400px] bg-blue-100/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[450px] h-[450px] bg-cyan-100/25 rounded-full filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24 gsap-reveal">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase font-mono px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            Fluxo de Trabalho
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4.5xl text-slate-900 tracking-tight mt-6 leading-none">
            Do Primeiro Contato à Entrega Impermeabilizada
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-5 mx-auto" />
          <p className="text-slate-500 text-sm sm:text-base mt-5 leading-relaxed">
            Simplificamos todo o processo de reforma e impermeabilização com total transparência técnica, cumprimento estrito de cronograma e conformidade jurídica. Conheça as etapas:
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-32 left-8 right-8 h-0.5 bg-slate-100 z-0">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-blue-500 via-primary to-emerald-500"
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10 gsap-stagger-container">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className="gsap-stagger-item flex flex-col group relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-lg shadow-slate-100/30 hover:border-primary/25 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header elements */}
                <div className="flex items-center justify-between mb-6">
                  {/* Styled Icon Container with Gradient Border */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${step.color}`}>
                    {step.icon}
                  </div>
                  
                  {/* Step numeric outline */}
                  <span className="font-display font-black text-4.5xl tracking-tighter text-blue-500/25 group-hover:text-blue-600/50 select-none transition-colors duration-300">
                    {step.number}
                  </span>
                </div>

                {/* Sub-Badges for Professional Engineering Authenticity */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="font-mono text-[9px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded uppercase">
                    {step.focus}
                  </span>
                  <span className="font-mono text-[9px] font-bold text-primary bg-blue-50/50 border border-blue-100/30 px-2 py-0.5 rounded uppercase">
                    {step.duration}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-display font-bold text-slate-900 text-base group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed flex-grow">
                  {step.description}
                </p>

                {/* Arrow indicator between steps (desktop only, except last) */}
                {idx < 3 && (
                  <div className="hidden lg:flex items-center justify-center absolute -right-3 top-32 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-slate-100 text-slate-300 group-hover:text-primary group-hover:border-primary/30 shadow-sm z-20 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
