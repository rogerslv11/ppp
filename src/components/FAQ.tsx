import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Search, MessageSquare, BookOpen, Settings, Droplet, Sparkles, ShieldCheck, HelpCircle as HelpIcon, CheckCircle2 } from 'lucide-react';

interface RichFAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'reformas' | 'impermeabilizacao' | 'vazamentos';
}

const enrichedFaqs: RichFAQItem[] = [
  {
    id: 1,
    question: 'Qual a vantagem da impermeabilização com fibra de vidro em relação ao azulejo ou vinil?',
    category: 'impermeabilizacao',
    answer: 'A laminação contínua com fibra de vidro premium cria um invólucro monolítico (sem emendas, juntas ou rejuntes), blindando totalmente o solo contra infiltrações. Ao contrário do azulejo que sofre fissuras estruturais nas juntas de dilatação, e do vinil que rasga facilmente, a fibra tem vida útil superior a 20 anos, resiste à movimentação do terreno e não desbota sob ação de raios UV e cloro.'
  },
  {
    id: 2,
    question: 'Como funciona o processo de detecção de vazamentos em piscinas?',
    category: 'vazamentos',
    answer: 'Utilizamos ensaios hidráulicos pressurizados de alta precisão (testes pneumáticos) para avaliar as linhas de retorno, aspiração e ralo de fundo. Para a estrutura física da piscina, realizamos testes de condutividade elétrica e corantes especiais sob água. Isso evita quebras desnecessárias, permitindo que nosso time atue cirurgicamente apenas na origem exata da patologia.'
  },
  {
    id: 3,
    question: 'Quanto tempo dura uma obra de reforma geral ou revestimento com fibra?',
    category: 'reformas',
    answer: 'A aplicação do liner contínuo de fibra de vidro em piscinas residenciais de tamanho padrão (8x4m) leva de 4 a 6 dias úteis para finalização completa. Reformas estruturais complexas envolvendo correção de trincas de alvenaria e alteração de profundidade levam de 10 a 15 dias úteis, dependendo do tempo de cura do concreto estrutural.'
  },
  {
    id: 4,
    question: 'Vocês emitem laudos de engenharia e ART (Anotação de Responsabilidade Técnica)?',
    category: 'vazamentos',
    answer: 'Sim! Como empresa credenciada ao CREA-RS e liderada por engenheiro civil habilitado, todas as nossas reformas, impermeabilizações de piscinas e laudos de reservatórios em condomínios são acompanhados de ART (Anotação de Responsabilidade Técnica). Esse documento atesta a segurança das fundações da edificação e a conformidade com as normas ABNT.'
  },
  {
    id: 5,
    question: 'Minha piscina de fibra desbotou e tem bolhas de osmose. É possível revitalizá-la?',
    category: 'reformas',
    answer: 'Sim, perfeitamente. Realizamos a remoção de todas as bolhas por fresagem técnica, fazemos o reforço da laminação de fibra em pontos enfraquecidos e finalizamos com a aplicação de gel-coat isoftálico premium em cabine protegida, seguido de polimento mecânico selante. O aspecto final é idêntico a uma piscina nova de fábrica.'
  },
  {
    id: 6,
    question: 'É necessário esvaziar a piscina por muito tempo durante as correções estruturais?',
    category: 'reformas',
    answer: 'Para impermeabilizações gerais ou reformas estruturais, o esvaziamento é indispensável. Nossos engenheiros calculam a subpressão do lençol freático para garantir que a piscina vazia não sofra empuxo hidrostático (risco de flutuação ou trincas laterais), procedendo com ancoragens temporárias quando necessário para garantir segurança absoluta.'
  },
  {
    id: 7,
    question: 'Quais normas técnicas a Renova adota em seus projetos de engenharia?',
    category: 'impermeabilizacao',
    answer: 'Nossas obras e projetos seguem estritamente as diretrizes da ABNT NBR 10339 (Projeto e execução de piscinas), NBR 15575 (Desempenho de Edificações), NBR 9575 (Impermeabilização - Seleção e Projeto) e NBR 9574 (Execução de impermeabilização), assegurando alta estanqueidade e resistência estrutural.'
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'todos' | 'reformas' | 'impermeabilizacao' | 'vazamentos'>('todos');
  const [openIndex, setOpenIndex] = useState<number | null>(1); // First item open by default

  const handleToggle = (id: number) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  // Filter and search logic
  const filteredFaqs = useMemo(() => {
    return enrichedFaqs.filter((faq) => {
      const matchesCategory = activeCategory === 'todos' || faq.category === activeCategory;
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-gradient-to-b from-white to-slate-50/40 relative">
      {/* Background ambient gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/30 rounded-full filter blur-3xl -z-10" />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-primary uppercase font-mono flex items-center justify-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Central de Dúvidas
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-slate-900 tracking-tight mt-2">
            Perguntas Frequentes de Engenharia
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4 mx-auto" />
          <p className="text-slate-500 text-sm sm:text-base mt-4">
            Consulte as respostas técnicas elaboradas pela nossa equipe de engenharia sobre prazos, normas ABNT, estanqueidade em fibra e laudos com emissão de ART.
          </p>
        </div>

        {/* Search & Filter Controls Panel */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-xl shadow-blue-500/5 mb-10 space-y-4">
          {/* Search Input Box */}
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4.5 h-4.5" />
            </div>
            <input
              type="text"
              placeholder="Pesquise por termos como 'fibra', 'ART', 'prazo', 'vazamento', 'osmose'..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenIndex(null); // Close open answers on search
              }}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-xs font-bold font-mono text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Categories Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-50">
            {[
              { id: 'todos', label: 'Ver Todos', icon: <BookOpen className="w-3.5 h-3.5" /> },
              { id: 'reformas', label: 'Reformas & Obras', icon: <Settings className="w-3.5 h-3.5" /> },
              { id: 'impermeabilizacao', label: 'Impermeabilização & Fibra', icon: <Droplet className="w-3.5 h-3.5" /> },
              { id: 'vazamentos', label: 'Vazamentos & ART', icon: <ShieldCheck className="w-3.5 h-3.5" /> }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  setOpenIndex(null); // Close active on change
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white shadow-md shadow-primary/15'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Stack with Improved Layout */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openIndex === faq.id;

                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className={`border rounded-2.5xl overflow-hidden transition-all duration-300 ${
                      isOpen 
                        ? 'border-primary/20 bg-blue-50/5 shadow-md shadow-blue-500/5' 
                        : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm'
                    }`}
                  >
                    {/* Trigger Button */}
                    <button
                      onClick={() => handleToggle(faq.id)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer transition-all duration-200"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-4 pr-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isOpen ? 'bg-primary/10 text-primary' : 'bg-slate-50 text-slate-400'
                        }`}>
                          <HelpIcon className="w-4.5 h-4.5" />
                        </div>
                        <span className="font-display font-bold text-slate-800 text-sm sm:text-base leading-snug">
                          {faq.question}
                        </span>
                      </div>

                      <div className={`w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 shrink-0 transition-all duration-300 ${
                        isOpen ? 'rotate-180 bg-primary/10 text-primary' : 'group-hover:bg-slate-100'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Animated Collapsible Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: 'auto', 
                            opacity: 1,
                            transition: { height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.25, delay: 0.05 } }
                          }}
                          exit={{ 
                            height: 0, 
                            opacity: 0,
                            transition: { height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.15 } }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-6 pl-17 sm:px-6 sm:pb-7 sm:pl-18 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100/50 pt-4 flex flex-col gap-3">
                            <p className="leading-relaxed text-slate-600">{faq.answer}</p>
                            
                            <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                              <span className="text-[10px] font-mono uppercase tracking-wider font-bold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md">
                                Categoria: {
                                  faq.category === 'reformas' ? 'Reformas & Obras' : 
                                  faq.category === 'impermeabilizacao' ? 'Impermeabilização & Estanqueidade' : 
                                  'Vazamentos & Laudos'
                                }
                              </span>
                              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-mono font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Revisado por Engenheiro</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-8"
              >
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="font-display font-bold text-slate-700">Nenhuma pergunta encontrada</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Não encontramos resultados para "{searchQuery}". Tente pesquisar por outros termos de reforma ou vazamentos.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Limpar Pesquisa
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom prompt - Beautiful Callout */}
        <div className="mt-12 text-center p-6 sm:p-8 rounded-3.5xl bg-white border border-slate-100 shadow-xl shadow-slate-100/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left max-w-md">
            <h4 className="font-display font-bold text-slate-800 text-sm sm:text-base">Possui um vazamento grave ou precisa de laudo com ART?</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Fale diretamente com nosso diretor técnico Marcos Oliveira, engenheiro civil perito em patologia estrutural e estanqueidade.
            </p>
          </div>
          <a
            href="https://wa.me/5551999999999?text=Ol%C3%A1%21+Gostaria+de+falar+com+o+Engenheiro+Marcos+sobre+minha+piscina."
            target="_blank"
            referrerPolicy="no-referrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/15 cursor-pointer shrink-0 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageSquare className="w-4.5 h-4.5 fill-current" />
            <span>Falar com o Engenheiro Marcos</span>
          </a>
        </div>

      </div>
    </section>
  );
}
