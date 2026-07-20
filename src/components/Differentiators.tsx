import { motion } from 'motion/react';
import { Award, Users, Zap, CheckCircle2, Wrench, ClipboardList, Check, Eye } from 'lucide-react';
import { differentiatorsData } from '../mockData';

export default function Differentiators() {
  // Map icons from mockData values with refined styles
  const renderIcon = (iconName: string, isHovered = false) => {
    const props = { className: `w-5 h-5 transition-transform duration-300 ${isHovered ? 'scale-110 text-white' : 'text-primary'}` };
    switch (iconName) {
      case 'Award': return <Award {...props} />;
      case 'Users': return <Users {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'CheckCircle': return <CheckCircle2 {...props} />;
      case 'Wrench': return <Wrench {...props} />;
      case 'ClipboardList': return <ClipboardList {...props} />;
      default: return <Award {...props} />;
    }
  };

  // Helper tags for engineering authenticity
  const getDifferentiatorMeta = (id: number) => {
    switch (id) {
      case 1: return { tag: 'Solidez', detail: 'Fundação sólida' };
      case 2: return { tag: 'Foco Técnico', detail: 'Especialistas focados' };
      case 3: return { tag: 'Conformidade', detail: 'Laudos com ART' };
      case 4: return { tag: 'Garantia', detail: 'Segurança em cartório' };
      case 5: return { tag: 'Profissionalismo', detail: 'Sem terceirização' };
      case 6: return { tag: 'Logística', detail: 'Atendimento ágil' };
      default: return { tag: 'Qualidade', detail: 'Padrão premium' };
    }
  };

  return (
    <section id="diferenciais" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
      {/* Subtle ambient grid & radial highlight */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#0077ff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/20 rounded-full filter blur-3xl animate-pulse-slow select-none pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24 gsap-reveal">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase font-mono px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            Diferenciais
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4.5xl text-slate-900 tracking-tight mt-6 leading-none">
            Por Que Escolher a Renova?
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-5 mx-auto" />
          <p className="text-slate-500 text-sm sm:text-base mt-5 leading-relaxed max-w-2xl mx-auto">
            Unimos o rigor técnico tradicional com tecnologias modernas para oferecer a melhor experiência em conservação e impermeabilização.
          </p>
        </div>

        {/* 3x2 Grid of Highly Refined Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 gsap-stagger-container">
          {differentiatorsData.map((diff) => {
            const meta = getDifferentiatorMeta(diff.id);
            return (
              <div
                key={diff.id}
                className="gsap-stagger-item group relative bg-white border border-slate-100 p-8 rounded-3xl hover:border-primary/20 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Decorative Side Highlight Line */}
                <div className="absolute top-8 left-0 w-1 h-12 bg-primary rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Floating Circle with Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50/75 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-blue-50">
                        {renderIcon(diff.iconName)}
                      </div>
                      <span className="font-mono text-[9px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded uppercase tracking-wider">
                        {meta.tag}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg group-hover:text-primary transition-colors">
                      {diff.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed">
                      {diff.description}
                    </p>
                  </div>

                  {/* Micro label details */}
                  <div className="border-t border-slate-50 pt-4 mt-6 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 font-medium">
                      {meta.detail}
                    </span>
                    <span className="text-[10px] text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Confiável <Check className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Highlight Banner under differentials: Bento Box Design */}
        <div className="hidden gsap-reveal-scale mt-20 sm:mt-24 rounded-3.5xl bg-gradient-to-br from-slate-900 via-blue-950 to-primary text-white overflow-hidden shadow-2xl shadow-blue-950/20 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-12 items-center">
            
            {/* Banner Left Info Block */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] text-cyan-400 uppercase font-mono bg-cyan-950/40 border border-cyan-800/40 px-3.5 py-1.5 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Transparência Técnica
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight">
                  Quer ver um laudo de visita real da Renova?
                </h3>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Nossos clientes recebem após cada vistoria ou manutenção um relatório técnico em formato digital (PDF), contendo controle completo de parâmetros, cronograma executado, registros fotográficos e recomendações do engenheiro responsável.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center lg:justify-start">
                <a
                  href="https://wa.me/5551999999999?text=Ol%C3%A1%21+Gostaria+de+ver+um+exemplo+do+relat%C3%B3rio+digital+de+visita+da+Renova."
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="px-6 py-3.5 bg-primary text-white font-bold hover:bg-primary-hover rounded-2xl shadow-lg shadow-primary/20 transition-all text-center text-xs sm:text-sm border border-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Eye className="w-4 h-4" />
                  Solicitar Exemplo PDF
                </a>
                <a
                  href="#contato"
                  className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-bold rounded-2xl transition-all text-center text-xs sm:text-sm border border-slate-700/60 flex items-center justify-center hover:scale-[1.02] active:scale-[0.98]"
                >
                  Agendar Visita Técnica Gratuita
                </a>
              </div>
            </div>

            {/* Banner Right: Simulated Premium Document Mockup */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="bg-white/95 backdrop-blur text-slate-800 rounded-2xl p-5 border border-white/10 shadow-2xl w-full max-w-[22rem] text-left transform rotate-1 hover:rotate-0 transition-transform duration-500 scale-95 sm:scale-100">
                {/* Document Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div>
                    <h4 className="font-display font-extrabold text-xs text-slate-900 uppercase">
                      Renova
                    </h4>
                    <p className="text-[8px] text-slate-400 font-mono tracking-wider leading-none mt-0.5">TECNOLOGIA INTEGRADA</p>
                  </div>
                  <div className="px-2 py-0.5 bg-blue-50 text-primary border border-blue-100 font-mono text-[7px] font-bold rounded">
                    LAUDO TÉCNICO
                  </div>
                </div>

                {/* Document Body Details */}
                <div className="space-y-3">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-[7.5px] font-mono text-slate-400 uppercase tracking-wider block">IDENTIFICAÇÃO DO PROJETO</span>
                    <span className="text-[10px] font-bold text-slate-800 block mt-0.5">Residencial Green Valley - Bloco C</span>
                    <span className="text-[8px] text-slate-500 block leading-none mt-0.5">Vistoria de Impermeabilização e Patologias</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[7.5px] font-mono text-slate-400 uppercase tracking-wider block">CRONOGRAMA DE CONTROLES</span>
                    
                    {[
                      { item: 'Teste de Esclerometria (Concreto)', ok: true },
                      { item: 'Ensaio de Impermeabilização Hidráulica', ok: true },
                      { item: 'Mapeamento de Fissuras Ativas', ok: true },
                      { item: 'Nível de Cloretos & pH da Água', ok: true }
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between text-[9px] bg-white border border-slate-100 p-1.5 rounded">
                        <span className="text-slate-600 truncate max-w-[12rem]">{row.item}</span>
                        <span className="font-mono text-[7.5px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1 rounded uppercase">
                          OK
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Document Footer */}
                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[8px] text-slate-400 font-mono">
                    <span>Cód: RN-948293</span>
                    <span className="font-bold text-primary flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> Responsabilidade ART
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
