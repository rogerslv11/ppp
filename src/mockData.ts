import { Service, Testimonial, FAQItem, GalleryItem, BeforeAfterItem, Differentiator, TeamMember } from './types';
import assets from './data/assets.json';

export const servicesData: Service[] = [
  {
    id: 1,
    title: 'Reformas de Piscinas',
    description: 'Transformação estrutural e estética de piscinas de concreto, alvenaria ou fibra.',
    detail: 'Realizamos reformas estruturais completas para modernizar sua piscina. Desde a alteração de profundidade e formato, até a instalação de novas prainhas, spas integrados, escadas de alvenaria e sistemas de borda infinita, garantindo engenharia robusta e acabamento impecável.',
    iconName: 'Sparkles',
    image: assets.services.reformas
  },
  {
    id: 2,
    title: 'Revitalização de Piscinas',
    description: 'Restauração completa da estética, brilho e sistemas de piscinas desgastadas pelo tempo.',
    detail: 'Tratamento intensivo para recuperar piscinas antigas ou desbotadas. Inclui polimento técnico avançado e pintura em gel-coat premium para piscinas de fibra, substituição de rejuntes desgastados, remoção de manchas químicas de calcificação e restauração de pedras de borda.',
    iconName: 'Droplet',
    image: assets.services.revitalizacao
  },
  {
    id: 3,
    title: 'Impermeabilização com Fibra',
    description: 'Liner contínuo de fibra de vidro de alta durabilidade para impermeabilização definitiva.',
    detail: 'O método mais eficaz e duradouro do mercado para eliminar infiltrações. Aplicamos uma barreira física contínua de resina estrutural e fibra de vidro (laminação técnica) sobre piscinas de alvenaria, concreto ou reservatórios, criando uma superfície 100% impermeável e fácil de limpar.',
    iconName: 'Trash2',
    image: assets.services.impermeabilizacao
  },
  {
    id: 4,
    title: 'Correção de Vazamentos',
    description: 'Detecção precisa e reparo definitivo de infiltrações e perdas de água na estrutura.',
    detail: 'Diagnóstico técnico especializado em patologias hidráulicas e estruturais. Localizamos e sanamos vazamentos em tubulações de retorno, aspiração ou ralo de fundo, além de trincas estruturais na alvenaria, eliminando o desperdício de água e protegendo as fundações da sua casa.',
    iconName: 'TrendingUp',
    image: assets.services.vazamentos
  },
  {
    id: 5,
    title: 'Recuperação Estrutural',
    description: 'Tratamento de trincas, rachaduras e recomposição do concreto armado comprometido.',
    detail: 'Intervenções de engenharia civil especializadas para salvar piscinas e reservatórios com danos graves. Realizamos o tratamento de ferragens expostas e oxidadas, injeção técnica de poliuretano em fissuras ativas e recomposição volumétrica com argamassa estrutural de alta resistência.',
    iconName: 'RefreshCw',
    image: assets.services.recuperacao
  },
  {
    id: 6,
    title: 'Reformas de Reservatórios',
    description: 'Manutenção, impermeabilização e adequação técnica de grandes reservatórios e cisternas.',
    detail: 'Serviço especializado para condomínios, indústrias e residências. Reformamos e impermeabilizamos reservatórios elevados e subterrâneos de água potável utilizando produtos atóxicos homologados pela ANVISA, garantindo impermeabilização total e potabilidade da água armazenada.',
    iconName: 'ShieldCheck',
    image: assets.services.revitalizacao
  },
  {
    id: 7,
    title: 'Instalações Hidráulicas',
    description: 'Redes de tubulação de alta pressão, redimensionamento de bombas e novos filtros.',
    detail: 'Substituição completa ou parcial da rede hidráulica da piscina e casa de máquinas. Projetamos e instalamos conjuntos moto-bomba eficientes, filtros de alta vazão, sistemas de aquecimento solar ou trocador de calor, e redes elétricas de comando automatizadas com proteção total.',
    iconName: 'Settings',
    image: assets.services.hidraulica
  },
  {
    id: 8,
    title: 'Revestimentos e Decks',
    description: 'Aplicação de pastilhas, cerâmicas, vinil premium e construção de decks de madeira nobres.',
    detail: 'Estética de alto padrão para sua área externa. Assentamento especializado de pastilhas cerâmicas e de vidro, aplicação de vinil reforçado e construção de decks de madeira de lei tratada (como Ipê e Cumaru) com acabamento naval impermeável e design ergonômico personalizado.',
    iconName: 'Cpu',
    image: assets.services.revestimentos
  }
];

export const beforeAfterData: BeforeAfterItem[] = [
  {
    id: 1,
    title: 'Recuperação de Piscina com Vazamento Severo',
    beforeImage: assets.services.reformas,
    afterImage: assets.services.reformas,
    description: 'Reforma integral de piscina de alvenaria antiga com vazamento de mais de 3.000 litros por dia. Recuperada estruturalmente e impermeabilizada definitivamente com revestimento de fibra de vidro em apenas 5 dias de obra.'
  },
  {
    id: 2,
    title: 'Revitalização Estética & Troca de Revestimento',
    beforeImage: assets.services.impermeabilizacao,
    afterImage: assets.services.impermeabilizacao,
    description: 'Transformação de piscina de fibra severamente desbotada, manchada e com bolhas. Foi realizada a remoção de osmose, reforço estrutural de laminação e nova pintura em gel-coat azul piscina com polimento espelhado.'
  }
];

export const differentiatorsData: Differentiator[] = [
  {
    id: 1,
    title: 'Mais de 20 Anos de Solidez',
    description: 'Nossa base na construção civil garante que compreendemos profundamente a engenharia de estruturas de concreto e as fundações do solo.',
    iconName: 'Award'
  },
  {
    id: 2,
    title: 'Especialistas há 5 Anos',
    description: 'Foco total e dedicado à impermeabilização em fibra de vidro, correção de vazamentos complexos e reformas estéticas de piscinas.',
    iconName: 'Users'
  },
  {
    id: 3,
    title: 'Engenharia com ART (CREA-RS)',
    description: 'Todos os nossos projetos e intervenções em condomínios e residências são acompanhados por engenheiro civil com emissão de ART.',
    iconName: 'Zap'
  },
  {
    id: 4,
    title: 'Garantia de Impermeabilização Real',
    description: 'Oferecemos garantia contratual de impermeabilização de longa duração para reformas estruturais e impermeabilizações com fibra.',
    iconName: 'CheckCircle'
  },
  {
    id: 5,
    title: 'Equipe Própria Qualificada',
    description: 'Técnicos especialistas em concreto, hidráulica de pressão e laminação de fibra. Não utilizamos terceirizados ou freelancers.',
    iconName: 'Wrench'
  },
  {
    id: 6,
    title: 'Atendimento na Região Metropolitana',
    description: 'Estrutura logística ágil para atender Porto Alegre, Gravataí, Canoas, Cachoeirinha e demais cidades metropolitanas.',
    iconName: 'ClipboardList'
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: 1,
    title: 'Impermeabilização de Reservatório',
    category: 'impermeabilizacao',
    images: [assets.services.impermeabilizacao],
    caption: 'Aplicação de fibra de vidro de alta pureza em reservatório industrial de água potável.'
  },
  {
    id: 2,
    title: 'Construção de Deck de Ipê Nobre',
    category: 'reforma',
    images: [assets.services.revestimentos],
    caption: 'Deck de madeira tratada construído ao redor de piscina revitalizada de alvenaria.'
  },
  {
    id: 3,
    title: 'Reforma de Vinil para Alvenaria',
    category: 'reforma',
    images: [assets.services.revitalizacao],
    caption: 'Reconstrução estrutural transformando uma piscina antiga de vinil em alvenaria com pastilhas.'
  },
  {
    id: 4,
    title: 'Revitalização em Pastilhas de Vidro',
    category: 'reforma',
    images: [assets.services.reformas],
    caption: 'Revestimento de alto padrão assentado em piscina aquecida de condomínio em Porto Alegre.'
  },
  {
    id: 5,
    title: 'Aplicação de Revestimento de Fibra',
    category: 'impermeabilizacao',
    images: [assets.services.recuperacao],
    caption: 'Laminação em fibra de vidro azul bebê para impermeabilização integral de piscina residencial.'
  },
  {
    id: 6,
    title: 'Instalação Hidráulica de Casa de Máquinas',
    category: 'vazamento',
    images: [assets.services.vazamentos],
    caption: 'Conjunto hidráulico de alta vazão com novas moto-bombas silenciosas e filtro de quartzo.'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Roberto de Souza',
    role: 'Síndico do Residencial Royal Park (Porto Alegre)',
    rating: 5,
    text: 'A reforma estrutural da piscina do nosso condomínio foi impecável. Corrigiram vazamentos graves que tínhamos há anos e aplicaram revestimento de fibra. Um nível técnico de engenharia espetacular.',
    image: assets.testimonials[0]
  },
  {
    id: 2,
    name: 'Cláudia Mendes',
    role: 'Proprietária de Residência em Canoas',
    rating: 5,
    text: 'Fizemos a impermeabilização com fibra de vidro na nossa piscina de alvenaria. O acabamento ficou perfeito, fácil de limpar e nunca mais tivemos infiltrações. Atendimento super pontual.',
    image: assets.testimonials[1]
  },
  {
    id: 3,
    name: 'Dr. Fernando Henrique',
    role: 'Clube Campestre (Gravataí)',
    rating: 5,
    text: 'Recuperaram estruturalmente o nosso reservatório de água e revitalizaram a piscina de concreto com azulejos novos. Trabalho sério, rápido e com engenheiro responsável acompanhando.',
    image: assets.testimonials[2]
  },
  {
    id: 4,
    name: 'Juliana Silveira',
    role: 'Arquiteta e Designer (Porto Alegre)',
    rating: 5,
    text: 'Como arquiteta, a execução precisa é vital. Sempre indico eles para revestimentos de piscinas e impermeabilização em terraços e sacadas dos meus projetos de alto padrão.',
    image: assets.testimonials[3]
  }
];

export const faqsData: FAQItem[] = [
  {
    id: 1,
    question: 'Quanto tempo dura a impermeabilização com fibra de vidro?',
    answer: 'A impermeabilização com fibra de vidro (liner de alta performance) possui durabilidade média superior a 15 a 20 anos. É uma das soluções mais eficientes e definitivas do mercado, eliminando completamente os riscos de fissuras estruturais e infiltrações comuns em alvenarias e concreto.'
  },
  {
    id: 2,
    question: 'Como é feito o diagnóstico de vazamentos estruturais?',
    answer: 'Utilizamos testes de impermeabilização pneumática nas tubulações e ensaios técnicos estruturais para identificar com precisão se o vazamento está na rede hidráulica (retorno, ralo de fundo, skimmer) ou na estrutura física (fissuras ou porosidade do concreto).'
  },
  {
    id: 3,
    question: 'Qual a diferença entre reforma e revitalização de piscina?',
    answer: 'A reforma envolve intervenções estruturais pesadas, como correção de vazamentos, reforço de concreto, alteração de formato ou troca completa de revestimento (ex: de azulejo para fibra ou vinil). A revitalização é focada na estética e funcionalidade, incluindo polimento, pintura especial, troca de rejuntes, iluminação LED e atualização de bombas e filtros.'
  },
  {
    id: 4,
    question: 'Vocês atendem condomínios e emitem laudo com ART?',
    answer: 'Sim, somos especializados no atendimento a condomínios de todos os portes em Porto Alegre e Região Metropolitana. Emitimos laudo técnico de engenharia (ART/RRT), nota fiscal de serviços e oferecemos garantia estrutural em contrato para todas as obras de reforma e impermeabilização.'
  },
  {
    id: 5,
    question: 'Minha piscina de fibra antiga desbotada tem conserto?',
    answer: 'Com certeza! Realizamos a revitalização completa de piscinas de fibra de vidro, removendo as bolhas (osmose), aplicando reforço estrutural e fazendo uma nova pintura em gel-coat premium com polimento de alto brilho, devolvendo o aspecto de nova.'
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Marcos Oliveira',
    role: 'Diretor de Engenharia Civil & Fundador',
    image: assets.team.marcos,
    certification: 'Engenheiro Civil & Perito Estrutural (CREA-RS)',
    experience: '20+ anos de experiência',
    bio: 'Especialista em patologias de concreto armado e grandes estruturas. Lidera o planejamento técnico de reformas estruturais e impermeabilizações complexas.',
    expertise: ['Engenharia Estrutural', 'Perícia de Vazamentos', 'Impermeabilização']
  }
];
