import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  Image as ImageIcon, 
  Eye, 
  X, 
  HelpCircle, 
  Wrench, 
  CheckCircle2, 
  Gauge, 
  Clock, 
  Award,
  AlertCircle,
  FileSpreadsheet,
  ShieldCheck
} from 'lucide-react';
import { GalleryItem, BeforeAfterItem } from '../types';
import { galleryData, beforeAfterData } from '../mockData';

// Rich technical data for each Before/After case
interface RecoveryTechnicalSpec {
  volume: string;
  tempo: string;
  diagnostico: string;
  tratamento: string;
  produtos: string;
  responsavel: string;
  parametrosAntes: { estanqueidade: string; infiltracao: string; acabamento: string; perda: string };
  parametrosDepois: { estanqueidade: string; infiltracao: string; acabamento: string; perda: string };
}

const technicalSpecs: Record<number, RecoveryTechnicalSpec> = {
  1: {
    volume: '45.000 Litros',
    tempo: '5 Dias Úteis',
    diagnostico: 'Piscina antiga de alvenaria com vazamento estrutural severo, perdendo cerca de 3.200 litros de água por dia. Fissura ativa na transição entre fundo e parede d\'água devido a recalque diferencial de fundações.',
    tratamento: 'Injeção estrutural de poliuretano expandido hidroativo para selagem de trincas profundas, seguida de revestimento contínuo em fibra de vidro com resina isoftálica. Acabamento gel-coat isoftálico azul celeste com barreira de barreira química.',
    produtos: 'Poliuretano expandido, Resina Isoftálica, Manta de Fibra de Vidro (300g/m²), Pintura Gel-coat Especial e Catalisador Butanox.',
    responsavel: 'Marcos Oliveira (CREA-RS: 507.123)',
    parametrosAntes: { estanqueidade: 'Comprometida (Vazamentos)', infiltracao: 'Solo encharcado sob a base', acabamento: 'Reboque craquelado e infiltração', perda: '3.200L / dia (Crítico)' },
    parametrosDepois: { estanqueidade: '100% Estanque (Monolítico)', infiltracao: 'Solo seco e estável', acabamento: 'Liner em Fibra liso e brilhante', perda: '0 Litros (Perda Zero)' }
  },
  2: {
    volume: '32.000 Litros',
    tempo: '3 Dias Úteis',
    diagnostico: 'Piscina de fibra desbotada, com descolamento estético de pintura, bolhas de osmose em estágio avançado (fibra quebradiça) e infiltrações na tubulação de retorno.',
    tratamento: 'Fresagem mecânica e raspagem das bolhas de osmose, lixamento completo de limpeza, laminação de reforço de fibra de vidro nas regiões enfraquecidas, pintura geral com gel-coat náutico premium de alto brilho e polimento selante de acabamento.',
    produtos: 'Massa de barreira química contra osmose, Gel-coat Azul Real Náutico, Manta de Fibra e Cera Selante Especial.',
    responsavel: 'Marcos Oliveira (CREA-RS: 507.123)',
    parametrosAntes: { estanqueidade: 'Frágil (Bolhas e Osmose)', infiltracao: 'Risco de vazamento em flanges', acabamento: 'Fibra fosca e descascando', perda: 'Infiltrações em tubos' },
    parametrosDepois: { estanqueidade: 'Reforço de Fibra Ativo', infiltracao: 'Flanges vedados e novos flanges', acabamento: 'Polimento espelhado premium', perda: 'Tubulação 100% estanque' }
  }
};

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<'antes-depois' | 'portfolio'>('antes-depois');
  const [galleryFilter, setGalleryFilter] = useState<'todos' | 'reforma' | 'impermeabilizacao' | 'vazamento'>('todos');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  // Before/After Slider States
  const [activeBaId, setActiveBaId] = useState<number>(1);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const isDragging = useRef(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const selectedBaItem = beforeAfterData.find(item => item.id === activeBaId) || beforeAfterData[0];
  const activeSpec = technicalSpecs[activeBaId] || technicalSpecs[1];

  // Drag handlers for the Before/After comparison bar
  const handleMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (isDragging.current) handleMove(e.clientX);
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (isDragging.current) handleMove(e.touches[0].clientX);
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('touchmove', handleWindowTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('touchmove', handleWindowTouchMove);
    };
  }, []);

  // Filter gallery items
  const filteredGallery = galleryFilter === 'todos'
    ? galleryData
    : galleryData.filter(item => item.category === galleryFilter);

  // Before/After visual effect filters based on which item is chosen
  const getBeforeFilterStyles = (id: number) => {
    if (id === 1) {
      // Dirty cracked tile look
      return { filter: 'saturate(0.5) brightness(0.6) contrast(1.2) sepia(0.2) blur(0.5px)' };
    }
    // Osmosis, chalky bubbles and faded fiberglass look
    return { filter: 'saturate(0.4) brightness(0.8) contrast(0.7) sepia(0.1)' };
  };

  return (
    <section id="antes-depois" className="py-24 sm:py-32 bg-white relative overflow-hidden">
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
      <div className="absolute top-1/4 -right-40 w-[400px] h-[400px] bg-blue-100/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[450px] h-[450px] bg-cyan-100/25 rounded-full filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase font-mono px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            Casos de Sucesso
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4.5xl text-slate-900 tracking-tight mt-6 leading-none">
            Laudos de Obra & Casos Reais
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-5 mx-auto" />
          
          {/* Main Category Selector */}
          <div className="mt-8 flex items-center justify-center gap-2 p-1.5 bg-slate-100 border border-slate-200/60 rounded-2xl max-w-sm mx-auto shadow-sm">
            <button
              onClick={() => setActiveTab('antes-depois')}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'antes-depois'
                  ? 'bg-white text-primary shadow-md border border-slate-100'
                  : 'text-slate-500 hover:text-slate-850 hover:bg-white/40'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Antes e Depois</span>
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'portfolio'
                  ? 'bg-white text-primary shadow-md border border-slate-100'
                  : 'text-slate-500 hover:text-slate-850 hover:bg-white/40'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Galeria de Serviços</span>
            </button>
          </div>
        </div>

        {/* --- BEFORE/AFTER SLIDER INTERACTIVE PANEL --- */}
        {activeTab === 'antes-depois' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left selector menu */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Casos de Patologia Física
                    </span>
                    <h3 className="font-display font-bold text-xl text-slate-900 mt-1">
                      Recuperações Estruturais
                    </h3>
                  </div>

                  <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                    {beforeAfterData.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveBaId(item.id);
                          setSliderPosition(50); // reset slider
                        }}
                        className={`text-left p-4.5 rounded-2xl border transition-all cursor-pointer min-w-[250px] lg:w-full shrink-0 flex flex-col gap-1.5 ${
                          activeBaId === item.id
                            ? 'bg-blue-50/40 border-primary/25 shadow-sm'
                            : 'bg-white border-slate-100 hover:bg-slate-50/80'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                            activeBaId === item.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            CASO {item.id}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono font-bold">
                            {item.id === 1 ? 'Vazamento' : 'Revitalização'}
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-slate-800 text-sm">
                          {item.id === 1 ? 'Impermeabilização Estrutural' : 'Restauração de Osmose'}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {item.id === 1 ? 'Selagem profunda de trincas ativas e aplicação de barreira monolítica.' : 'Fresagem de bolhas em fibra e pintura de alta tecnologia gel-coat.'}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Micro guidelines box */}
                <div className="bg-slate-50 p-4.5 rounded-2.5xl border border-slate-100/80 flex gap-3 text-xs text-slate-500">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5 animate-pulse" />
                  <p className="leading-relaxed">
                    <strong>Arraste o comparador:</strong> Toque ou clique na barra branca no centro da imagem e arraste-a lateralmente para ver a diferença do estado antes e depois do choque de engenharia.
                  </p>
                </div>
              </div>

              {/* Right comparison stage */}
              <div className="lg:col-span-8 flex flex-col">
                <div 
                  ref={sliderContainerRef}
                  onClick={(e) => handleMove(e.clientX)}
                  className="relative w-full h-[24rem] sm:h-[30rem] rounded-3.5xl overflow-hidden select-none cursor-ew-resize border border-slate-100 shadow-2xl shadow-blue-500/5 bg-slate-100"
                >
                  {/* AFTER STATE IMAGE (Background) */}
                  <img 
                    src={selectedBaItem.afterImage} 
                    alt="Depois Tratamento" 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                  
                  {/* AFTER BADGE */}
                  <div className="absolute right-4 bottom-4 z-20 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider border border-white/5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Depois (Concluído & Estanque)
                  </div>

                  {/* BEFORE STATE IMAGE (Clip Path Overlay) */}
                  <div 
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                  >
                    <img 
                      src={selectedBaItem.beforeImage} 
                      alt="Antes Tratamento" 
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      style={getBeforeFilterStyles(selectedBaItem.id)}
                    />
                    {/* BEFORE BADGE */}
                    <div className="absolute left-4 bottom-4 z-20 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md text-rose-400 font-mono text-[10px] uppercase font-bold tracking-wider border border-white/5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      Antes (Vazamentos / Degradado)
                    </div>
                  </div>

                  {/* SLIDER CONTROLLER HANDLE */}
                  <div 
                    className="absolute top-0 bottom-0 w-1.5 bg-white cursor-ew-resize z-30 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    style={{ left: `${sliderPosition}%` }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      isDragging.current = true;
                    }}
                    onTouchStart={(e) => {
                      isDragging.current = true;
                    }}
                  >
                    {/* Handle Ring */}
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-primary flex items-center justify-center shadow-2xl border-2 border-primary z-40 active:scale-90 transition-transform">
                      <div className="flex gap-1 items-center">
                        <span className="text-[10px] font-bold tracking-tighter select-none pointer-events-none text-primary">&larr;</span>
                        <span className="text-[10px] font-bold tracking-tighter select-none pointer-events-none text-primary">&rarr;</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description under slider */}
                <p className="mt-4 text-center text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                  {selectedBaItem.description}
                </p>
              </div>

            </div>

            {/* Scientific recovery report - TECHNICAL SHEET */}
            <div className="bg-slate-900 text-white rounded-3.5xl p-6 sm:p-10 border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/10 filter blur-3xl -z-0" />
              
              <div className="relative z-10 space-y-6">
                {/* Header technical section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-accent flex items-center justify-center border border-white/5">
                      <ShieldCheck className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase leading-none block">
                        Ficha Técnica Oficial da Obra
                      </span>
                      <h4 className="font-display font-bold text-lg sm:text-xl text-white mt-1.5">
                        Laudo de Engenharia &bull; Caso {activeSpec.volume === '45.000 Litros' ? '01' : '02'}
                      </h4>
                    </div>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span>ART de Engenharia Emitida (CREA-RS)</span>
                  </div>
                </div>

                {/* Quick stats details row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Volume Hidráulico</span>
                    <p className="text-base font-bold text-white mt-1">{activeSpec.volume}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Tempo de Obra</span>
                    <p className="text-base font-bold text-white mt-1">{activeSpec.tempo}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Engenheiro Supervisor</span>
                    <p className="text-base font-bold text-white mt-1 truncate">{activeSpec.responsavel.split(' (')[0]}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Tecnologias de Obra</span>
                    <p className="text-xs font-semibold text-slate-300 mt-1 line-clamp-2">{activeSpec.produtos}</p>
                  </div>
                </div>

                {/* Diagnóstico vs Procedimento */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold font-mono tracking-wider text-rose-400 uppercase flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      Diagnóstico de Engenharia (Antes)
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/2.5 p-4 rounded-2.5xl border border-white/2.5">
                      {activeSpec.diagnostico}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold font-mono tracking-wider text-emerald-400 uppercase flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Intervenção Técnica Executada
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/2.5 p-4 rounded-2.5xl border border-white/2.5">
                      {activeSpec.tratamento}
                    </p>
                  </div>
                </div>

                {/* Parameters Comparison Table */}
                <div className="border-t border-white/5 pt-5">
                  <h5 className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase mb-4 flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-accent" />
                    Comparativo de Estanqueidade & Desempenho
                  </h5>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    {[
                      { metric: 'Estanqueidade', antes: activeSpec.parametrosAntes.estanqueidade, depois: activeSpec.parametrosDepois.estanqueidade },
                      { metric: 'Solo Base', antes: activeSpec.parametrosAntes.infiltracao, depois: activeSpec.parametrosDepois.infiltracao },
                      { metric: 'Acabamento', antes: activeSpec.parametrosAntes.acabamento, depois: activeSpec.parametrosDepois.acabamento },
                      { metric: 'Perda D\'água', antes: activeSpec.parametrosAntes.perda, depois: activeSpec.parametrosDepois.perda }
                    ].map((m, idx) => (
                      <div key={idx} className="bg-white/2.5 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-400 font-mono">{m.metric}</span>
                        <div className="mt-3 space-y-1.5">
                          <div>
                            <span className="text-[9px] text-slate-500 block uppercase font-mono">Antes:</span>
                            <span className="text-xs font-bold text-rose-400 leading-tight block">{m.antes}</span>
                          </div>
                          <div className="border-t border-white/5 pt-1.5">
                            <span className="text-[9px] text-slate-500 block uppercase font-mono">Depois:</span>
                            <span className="text-xs font-bold text-emerald-400 leading-tight block">{m.depois}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* --- DYNAMIC MASONRY PORTFOLIO GALLERY --- */}
        {activeTab === 'portfolio' && (
          <div>
            {/* Gallery Category Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
              {[
                { id: 'todos', label: 'Ver Todos' },
                { id: 'reforma', label: 'Reformas' },
                { id: 'impermeabilizacao', label: 'Impermeabilização' },
                { id: 'vazamento', label: 'Vazamentos & Hidráulica' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setGalleryFilter(tab.id as any)}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                    galleryFilter === tab.id
                      ? 'bg-primary text-white shadow-md shadow-primary/15'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Masonry Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredGallery.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setLightboxImage(item)}
                    className="group bg-slate-50/40 rounded-3.5xl p-4 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-64 rounded-2.5xl overflow-hidden mb-4 bg-slate-100">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-11 h-11 rounded-full bg-white text-primary flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                            <Eye className="w-5.5 h-5.5" />
                          </div>
                        </div>
                        
                        {/* Category Pill Tag */}
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/85 text-white text-[10px] font-mono tracking-widest uppercase backdrop-blur-md">
                          {item.category === 'reforma' ? 'Reforma' : item.category === 'impermeabilizacao' ? 'Impermeabilização' : 'Vazamento'}
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-slate-800 text-sm px-1 mt-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 px-1 line-clamp-2 leading-relaxed">
                        {item.caption}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 px-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Ref: PC-0{item.id}</span>
                      <span className="text-primary font-bold hover:underline flex items-center gap-0.5">Laudo com ART</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

      </div>

      {/* --- LIGHTBOX MODAL DIALOG --- */}
      <AnimatePresence>
        {lightboxImage && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
            />

            {/* Image viewport container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-4xl w-full flex flex-col items-center"
              >
                <div className="relative w-full max-h-[75vh] flex items-center justify-center bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={lightboxImage.image} 
                    alt={lightboxImage.title} 
                    className="max-w-full max-h-[70vh] object-contain"
                  />

                  {/* Close floating button */}
                  <button
                    onClick={() => setLightboxImage(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Captions below */}
                <div className="mt-5 text-center max-w-xl text-white">
                  <span className="text-[9px] font-mono tracking-widest text-accent uppercase font-bold bg-white/10 px-3 py-1 rounded-lg">
                    {lightboxImage.category === 'reforma' ? 'Reforma de Alta Engenharia' : lightboxImage.category === 'impermeabilizacao' ? 'Impermeabilização de Longa Duração' : 'Detecção e Reparo de Vazamento'}
                  </span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white mt-3">
                    {lightboxImage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                    {lightboxImage.caption}
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
