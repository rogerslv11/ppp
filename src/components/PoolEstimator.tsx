import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Droplet, 
  Sparkles, 
  CheckCircle, 
  Calculator, 
  Wrench,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Layout,
  Layers,
  ChevronRight,
  Sparkle,
  PhoneCall
} from 'lucide-react';

type PoolShape = 'rectangular' | 'circular' | 'oval';
type CurrentCoating = 'fibra' | 'pastilha' | 'vinil' | 'concreto';
type PoolAge = 'nova' | '5-10' | '10-20' | '20+';

interface ServiceOption {
  id: string;
  title: string;
  description: string;
  baseCostMin: number; // cost per m² or flat
  baseCostMax: number;
  isPerSqM: boolean;
  isPerDeckSqM?: boolean;
}

export default function PoolEstimator() {
  const [shape, setShape] = useState<PoolShape>('rectangular');
  const [length, setLength] = useState<number>(8);
  const [width, setWidth] = useState<number>(4);
  const [depth, setDepth] = useState<number>(1.4);
  const [diameter, setDiameter] = useState<number>(6);
  const [coating, setCoating] = useState<CurrentCoating>('pastilha');
  const [age, setAge] = useState<PoolAge>('10-20');
  const [deckSize, setDeckSize] = useState<number>(15); // in m²
  
  // Selected services state
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'impermeabilizacao', 'hidraulica'
  ]);

  // Calculations
  const [volume, setVolume] = useState<number>(0);
  const [surfaceArea, setSurfaceArea] = useState<number>(0);
  const [estimatedCostMin, setEstimatedCostMin] = useState<number>(0);
  const [estimatedCostMax, setEstimatedCostMax] = useState<number>(0);
  const [complexity, setComplexity] = useState<{ label: string; color: string; bg: string; icon: React.ReactNode }>({
    label: 'Média',
    color: 'text-amber-500 border-amber-300',
    bg: 'bg-amber-50',
    icon: <AlertTriangle className="w-4 h-4" />
  });
  const [timeline, setTimeline] = useState<string>('5 a 7 dias úteis');

  const servicesList: ServiceOption[] = [
    {
      id: 'impermeabilizacao',
      title: 'Impermeabilização com Fibra',
      description: 'Liner contínuo de fibra de vidro de alta resistência. Impermeabilização definitiva.',
      baseCostMin: 160,
      baseCostMax: 230,
      isPerSqM: true
    },
    {
      id: 'revitalizacao',
      title: 'Revitalização & Pintura Gel-coat',
      description: 'Polimento técnico e nova pintura gel-coat automotiva (ideal para piscinas de fibra).',
      baseCostMin: 85,
      baseCostMax: 125,
      isPerSqM: true
    },
    {
      id: 'revestimento',
      title: 'Pastilhamento Novo',
      description: 'Substituição ou aplicação de pastilhas cerâmicas ou de vidro de alta qualidade.',
      baseCostMin: 220,
      baseCostMax: 360,
      isPerSqM: true
    },
    {
      id: 'hidraulica',
      title: 'Correção de Vazamento / Filtro',
      description: 'Detecção pneumática, troca de tubulação rachada e redimensionamento de bombas.',
      baseCostMin: 1800,
      baseCostMax: 3500,
      isPerSqM: false
    },
    {
      id: 'estrutural',
      title: 'Recuperação Estrutural de Trincas',
      description: 'Tratamento de concreto armado, injeção de poliuretano e contenção de vazamentos graves.',
      baseCostMin: 2500,
      baseCostMax: 5500,
      isPerSqM: false
    },
    {
      id: 'deck',
      title: 'Deck de Madeira de Lei',
      description: 'Construção de deck ao redor em madeira Cumaru ou Ipê tratado e verniz naval.',
      baseCostMin: 380,
      baseCostMax: 580,
      isPerSqM: false,
      isPerDeckSqM: true
    },
    {
      id: 'automacao',
      title: 'Iluminação LED RGB & Comando',
      description: 'Pontos de luz LED subaquáticos controlados por smartphone e painel de comando.',
      baseCostMin: 900,
      baseCostMax: 1900,
      isPerSqM: false
    }
  ];

  const handleToggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Re-calculate on state change
  useEffect(() => {
    let computedVolumeM3 = 0;
    let computedSurfaceArea = 0; // Pool walls + floor surface area in m²

    if (shape === 'rectangular') {
      computedVolumeM3 = length * width * depth;
      const floorArea = length * width;
      const wallsArea = 2 * (length * depth) + 2 * (width * depth);
      computedSurfaceArea = floorArea + wallsArea;
    } else if (shape === 'circular') {
      const radius = diameter / 2;
      computedVolumeM3 = Math.PI * Math.pow(radius, 2) * depth;
      const floorArea = Math.PI * Math.pow(radius, 2);
      const wallsArea = 2 * Math.PI * radius * depth;
      computedSurfaceArea = floorArea + wallsArea;
    } else if (shape === 'oval') {
      computedVolumeM3 = length * width * depth * 0.785;
      const floorArea = length * width * 0.785;
      const perimeter = Math.PI * (0.75 * (length + width) - 0.5 * Math.sqrt(length * width));
      const wallsArea = perimeter * depth;
      computedSurfaceArea = floorArea + wallsArea;
    }

    const volumeLiters = Math.round(computedVolumeM3 * 1000);
    setVolume(volumeLiters);
    setSurfaceArea(Math.round(computedSurfaceArea * 10) / 10);

    // Calculate budget estimation
    let totalMin = 0;
    let totalMax = 0;

    selectedServices.forEach(srvId => {
      const option = servicesList.find(s => s.id === srvId);
      if (option) {
        if (option.isPerSqM) {
          totalMin += option.baseCostMin * computedSurfaceArea;
          totalMax += option.baseCostMax * computedSurfaceArea;
        } else if (option.isPerDeckSqM) {
          totalMin += option.baseCostMin * deckSize;
          totalMax += option.baseCostMax * deckSize;
        } else {
          totalMin += option.baseCostMin;
          totalMax += option.baseCostMax;
        }
      }
    });

    // Apply age-modifier
    let multiplier = 1.0;
    if (age === '5-10') multiplier = 1.1;
    else if (age === '10-20') multiplier = 1.25;
    else if (age === '20+') multiplier = 1.4;

    // Apply coating-modifier (some coatings require more preparation)
    if (coating === 'concreto' || coating === 'pastilha') {
      multiplier *= 1.15; // requires more demolition or sanding
    }

    setEstimatedCostMin(Math.round(totalMin * multiplier));
    setEstimatedCostMax(Math.round(totalMax * multiplier));

    // Complexity definition
    let servicesCount = selectedServices.length;
    let complexityLevel = 'Média';
    let complexityColor = 'text-amber-500 border-amber-200';
    let complexityBg = 'bg-amber-50/50';
    let complexityIcon = <AlertTriangle className="w-4 h-4 text-amber-500" />;

    if (servicesCount >= 4 || age === '20+' || (selectedServices.includes('estrutural') && selectedServices.includes('impermeabilizacao'))) {
      complexityLevel = 'Alta / Crítica';
      complexityColor = 'text-red-500 border-red-200';
      complexityBg = 'bg-red-50/50';
      complexityIcon = <Flame className="w-4 h-4 text-red-500" />;
    } else if (servicesCount <= 2 && age === 'nova') {
      complexityLevel = 'Baixa';
      complexityColor = 'text-emerald-500 border-emerald-200';
      complexityBg = 'bg-emerald-50/50';
      complexityIcon = <CheckCircle className="w-4 h-4 text-emerald-500" />;
    }

    setComplexity({
      label: complexityLevel,
      color: complexityColor,
      bg: complexityBg,
      icon: complexityIcon
    });

    // Timeline estimate
    let daysMin = 3;
    let daysMax = 5;

    if (selectedServices.includes('impermeabilizacao')) { daysMin += 2; daysMax += 3; }
    if (selectedServices.includes('revestimento')) { daysMin += 4; daysMax += 6; }
    if (selectedServices.includes('estrutural')) { daysMin += 3; daysMax += 5; }
    if (selectedServices.includes('deck')) { daysMin += 2; daysMax += 4; }

    setTimeline(`${daysMin} a ${daysMax} dias úteis`);

  }, [shape, length, width, depth, diameter, coating, age, deckSize, selectedServices]);

  const handleWhatsAppSend = () => {
    const shapeLabel = shape === 'rectangular' ? 'Retangular' : shape === 'circular' ? 'Circular' : 'Oval';
    const dimensions = shape === 'circular' 
      ? `Diâmetro: ${diameter}m, Profundidade: ${depth}m`
      : `Dimensões: ${length}m comprimento x ${width}m largura x ${depth}m profundidade`;
    
    const coatingLabel = coating === 'fibra' ? 'Fibra de Vidro' : coating === 'pastilha' ? 'Alvenaria (Azulejo/Pastilha)' : coating === 'vinil' ? 'Vinil' : 'Concreto Puro / Alvenaria crua';
    const ageLabel = age === 'nova' ? 'Recém-construída (<5 anos)' : age === '5-10' ? 'Entre 5 e 10 anos' : age === '10-20' ? 'Entre 10 e 20 anos' : 'Mais de 20 anos';
    
    const chosenServicesText = selectedServices.map(s => {
      const item = servicesList.find(opt => opt.id === s);
      return `  - ${item?.title}`;
    }).join('\n');

    const msg = `Olá Engenheiro Marcos! Utilizei o Simulador de Reforma & Impermeabilização no site e gostaria de solicitar uma vistoria técnica presencial.

*DADOS DA MINHA PISCINA:*
• Formato: ${shapeLabel}
• ${dimensions}
• Revestimento Atual: ${coatingLabel}
• Idade Aproximada: ${ageLabel}
• Área Superficial Estimada: ${surfaceArea} m²
• Volume Calculado: ${volume.toLocaleString('pt-BR')} litros (${(volume / 1000).toFixed(1)} m³)

*SERVIÇOS DE INTERESSE:*
${chosenServicesText}
${selectedServices.includes('deck') ? `• Área do Deck Desejado: ${deckSize} m²\n` : ''}
*CÁLCULOS ESTIMADOS NO SITE:*
• Complexidade da Obra: ${complexity.label}
• Prazo Estimado de Execução: ${timeline}
• Estimativa de Custo (Preparo + Obra): R$ ${estimatedCostMin.toLocaleString('pt-BR')} a R$ ${estimatedCostMax.toLocaleString('pt-BR')}

Por favor, gostaria de agendar uma visita técnica especializada em Porto Alegre para confirmar a impermeabilização e validar o orçamento definitivo.`;

    const encodedText = encodeURIComponent(msg);
    window.open(`https://wa.me/5551999999999?text=${encodedText}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="simulador" className="py-12 sm:py-20 bg-gradient-to-b from-white to-slate-50/50 relative overflow-hidden">
      {/* Dynamic Range Slider Custom CSS */}
      <style>{`
        input[type="range"]::-webkit-slider-runnable-track {
          background: #e2e8f0;
          height: 6px;
          border-radius: 9999px;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          background: #0284c7;
          border: 3px solid #ffffff;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          margin-top: -6px;
          box-shadow: 0 4px 10px rgba(2, 132, 199, 0.4);
          transition: all 0.15s ease-in-out;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 14px rgba(2, 132, 199, 0.6);
        }
        @keyframes subtle-shimmer {
          0% { transform: translate(-30%, -30%) rotate(0deg); }
          50% { transform: translate(-33%, -35%) rotate(180deg); }
          100% { transform: translate(-30%, -30%) rotate(360deg); }
        }
        .animate-water-shimmer {
          animation: subtle-shimmer 20s linear infinite;
        }
      `}</style>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-primary uppercase font-mono flex items-center justify-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            Simulador Especialista
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-slate-900 tracking-tight mt-2">
            Simulador de Reforma & Impermeabilização
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4 mx-auto" />
          <p className="text-slate-500 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            Selecione as dimensões da sua piscina, o estado do revestimento e os serviços necessários para obter uma estimativa de prazo, complexidade e investimento em tempo real.
          </p>
        </div>

        {/* Main Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Inputs, Dimensions & Selections (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Shape, Coating and Age */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-base">Especificações Existentes</h3>
                  <p className="text-xs text-slate-400 font-medium">Formato, Revestimento atual e Idade física</p>
                </div>
              </div>

              {/* Pool Shape Selection */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">1. Formato da Piscina</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['rectangular', 'circular', 'oval'] as PoolShape[]).map((shp) => (
                    <button
                      key={shp}
                      onClick={() => setShape(shp)}
                      className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer flex flex-col items-center gap-1.5 ${
                        shape === shp
                          ? 'bg-primary/5 text-primary border-primary shadow-sm shadow-primary/5'
                          : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50 hover:border-slate-200 text-slate-600'
                      }`}
                    >
                      <Layout className="w-4 h-4" />
                      <span className="capitalize">{shp === 'rectangular' ? 'Retangular' : shp === 'circular' ? 'Circular' : 'Oval'}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Coating and Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">2. Revestimento Atual</label>
                  <select
                    value={coating}
                    onChange={(e) => setCoating(e.target.value as CurrentCoating)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/80 text-sm font-medium text-slate-700 focus:outline-none focus:border-primary focus:bg-white transition-all"
                  >
                    <option value="fibra">Fibra de Vidro (Pintura)</option>
                    <option value="pastilha">Alvenaria com Pastilha/Azulejo</option>
                    <option value="vinil">Bolsão de Vinil</option>
                    <option value="concreto">Concreto Puro / Alvenaria Sem Revestimento</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">3. Idade da Estrutura</label>
                  <select
                    value={age}
                    onChange={(e) => setAge(e.target.value as PoolAge)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/80 text-sm font-medium text-slate-700 focus:outline-none focus:border-primary focus:bg-white transition-all"
                  >
                    <option value="nova">Nova / Conservada (&lt; 5 anos)</option>
                    <option value="5-10">Entre 5 e 10 anos</option>
                    <option value="10-20">Entre 10 e 20 anos (Requer Cuidados)</option>
                    <option value="20+">Mais de 20 anos (Patologias Prováveis)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Dimensions sliders */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-base">Dimensões da Piscina</h3>
                  <p className="text-xs text-slate-400 font-medium">Arraste os controles para ajustar as medidas</p>
                </div>
              </div>

              {shape !== 'circular' ? (
                <>
                  {/* Comprimento */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                      <span className="uppercase tracking-wider">Comprimento</span>
                      <span className="font-mono text-primary bg-primary/5 px-2.5 py-1 rounded-lg text-sm">{length} metros</span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={25}
                      step={0.5}
                      value={length}
                      onChange={(e) => setLength(parseFloat(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Largura */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                      <span className="uppercase tracking-wider">Largura</span>
                      <span className="font-mono text-primary bg-primary/5 px-2.5 py-1 rounded-lg text-sm">{width} metros</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={12}
                      step={0.5}
                      value={width}
                      onChange={(e) => setWidth(parseFloat(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </>
              ) : (
                /* Diâmetro */
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span className="uppercase tracking-wider">Diâmetro</span>
                    <span className="font-mono text-primary bg-primary/5 px-2.5 py-1 rounded-lg text-sm">{diameter} metros</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={15}
                    step={0.5}
                    value={diameter}
                    onChange={(e) => setDiameter(parseFloat(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              )}

              {/* Profundidade Média */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span className="uppercase tracking-wider">Profundidade Média</span>
                  <span className="font-mono text-primary bg-primary/5 px-2.5 py-1 rounded-lg text-sm">{depth} metros</span>
                </div>
                <input
                  type="range"
                  min={0.8}
                  max={2.5}
                  step={0.1}
                  value={depth}
                  onChange={(e) => setDepth(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Step 3: Desired Services */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-base">Serviços Desejados</h3>
                  <p className="text-xs text-slate-400 font-medium">Selecione uma ou mais soluções especializadas</p>
                </div>
              </div>

              {/* Services Multi-Select List */}
              <div className="space-y-3.5">
                {servicesList.map((srv) => {
                  const isSelected = selectedServices.includes(srv.id);
                  return (
                    <div
                      key={srv.id}
                      onClick={() => handleToggleService(srv.id)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex gap-4 items-start group relative ${
                        isSelected
                          ? 'bg-blue-50/40 border-primary/25 shadow-sm'
                          : 'bg-slate-50/30 border-slate-100 hover:bg-slate-50/80 hover:border-slate-200'
                      }`}
                    >
                      {/* Checkbox circle */}
                      <div className={`w-5 h-5 rounded-full shrink-0 mt-0.5 border flex items-center justify-center transition-colors ${
                        isSelected 
                          ? 'bg-primary border-primary text-white' 
                          : 'border-slate-300 group-hover:border-slate-400 bg-white'
                      }`}>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
                      </div>

                      <div className="space-y-1 pr-6">
                        <h4 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5">
                          {srv.title}
                          {srv.id === 'impermeabilizacao' && (
                            <span className="text-[9px] font-mono font-bold bg-accent/10 border border-accent/20 text-accent px-1.5 py-0.5 rounded uppercase leading-none">
                              Mais Recomendado
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium leading-normal">
                          {srv.description}
                        </p>

                        {/* Optional Deck Size inputs inline */}
                        {srv.id === 'deck' && isSelected && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-3 bg-white p-3.5 rounded-xl border border-slate-100 space-y-2 text-left"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                              <span>Área do Deck de Madeira</span>
                              <span className="font-mono text-primary bg-primary/5 px-2.5 py-0.5 rounded text-xs">{deckSize} m²</span>
                            </div>
                            <input
                              type="range"
                              min={5}
                              max={80}
                              step={5}
                              value={deckSize}
                              onChange={(e) => setDeckSize(parseInt(e.target.value))}
                              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                            />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Real-time dynamic results card (Col 5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            
            {/* Real-time pool volume & graphic card */}
            <div className="bg-slate-900 rounded-3.5xl p-6 sm:p-8 border border-white/5 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
              
              {/* Backlight Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/10 filter blur-3xl" />
              
              <div className="relative z-10 space-y-6">
                
                {/* Simulated Swimming Pool Graphic */}
                <div className="w-full h-32 rounded-2xl bg-slate-950/50 border border-white/5 relative overflow-hidden flex items-center justify-center">
                  
                  {/* Fluid Ripple Wave */}
                  <div className="absolute inset-x-0 bottom-0 top-[20%] bg-gradient-to-t from-primary/30 to-accent/40 rounded-t-3xl border-t border-accent/40 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay animate-water-shimmer w-[200%] h-[200%] left-[-50%] top-[-50%]" 
                      style={{ 
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                      }} 
                    />
                  </div>

                  <div className="relative z-10 text-center">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 block uppercase">Volume Hidráulico</span>
                    <span className="font-display font-black text-2xl sm:text-3xl text-white block mt-1 tracking-tight">
                      {volume.toLocaleString('pt-BR')} <span className="text-accent text-sm font-medium">L</span>
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-300 mt-1 block">
                      Área Superficial: {surfaceArea} m² &bull; {(volume / 1000).toFixed(1)} m³
                    </span>
                  </div>
                </div>

                {/* Scope Indicators */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Complexidade</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-xs font-bold text-white block">{complexity.label}</span>
                      {complexity.icon}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Prazo de Obra</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="text-xs font-bold text-white block">{timeline}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-5 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Investimento Estimado (BRL)</span>
                    <div className="flex items-baseline gap-1 mt-1.5">
                      <span className="font-mono text-sm font-semibold text-slate-300">R$</span>
                      <span className="font-display font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-100 to-white">
                        {estimatedCostMin.toLocaleString('pt-BR')} - {estimatedCostMax.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium block mt-1 leading-normal">
                      *Estimativa inclui preparação de superfície, aplicação técnica de produtos e mão de obra profissional qualificada.
                    </span>
                  </div>

                  {/* Guaranteed Technical Standard */}
                  <div className="bg-white/2.5 p-4 rounded-2xl border border-white/5 space-y-2.5">
                    <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider block">Estão Inclusos no Orçamento:</span>
                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div className="flex gap-2 items-center">
                        <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                        <span>Acompanhamento Técnico por Engenheiro Civil</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                        <span>Garantia Contratual e Laudo Técnico para Condomínios</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                        <span>Teste de Impermeabilização de 72 Horas Pós-Obra</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                        <span>Garantia de Longa Duração Real em Contrato</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call Action Button */}
                <button
                  onClick={handleWhatsAppSend}
                  className="w-full py-4.5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
                >
                  <PhoneCall className="w-5 h-5 text-accent group-hover:rotate-6 transition-transform" />
                  <span>Aprovar Estimativa & Agendar Visita</span>
                  <ChevronRight className="w-4.5 h-4.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-[10px] text-slate-400 font-medium leading-relaxed mt-2">
                  Atendimento em toda Região Metropolitana de Porto Alegre.
                </p>

              </div>
            </div>

            {/* Scientific explanation callout */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg shadow-slate-100/50 flex gap-3 text-xs text-slate-600 leading-relaxed">
              <Sparkle className="w-5 h-5 text-accent shrink-0 mt-0.5 animate-pulse" />
              <div>
                <p className="font-bold text-slate-800">Garantia Real de Impermeabilização</p>
                <p className="mt-0.5 text-slate-500">
                  Nossas soluções de laminação com fibra de vidro premium criam um copo monolítico (liner vedado continuo) impermeável, isento de porosidade ou trincas hidráulicas, eliminando permanentemente qualquer perda de água.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
