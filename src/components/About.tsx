import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Check, ShieldAlert, Award, Star, BookOpen, Target, Heart, Briefcase } from 'lucide-react';
import { gsap } from 'gsap';
import { teamMembers } from '../mockData';
import { TeamMember } from '../types';

interface TeamMemberCardProps {
  member: TeamMember;
  idx: number;
  key?: React.Key;
}

function TeamMemberCard({ member, idx }: TeamMemberCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Premium 3D perspective tilt: up to 10 degrees of rotation on X and Y axes
    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Premium subtle magnetic pull (up to 15-20px)
    const magneticX = x * 0.12;
    const magneticY = y * 0.12;

    gsap.to(imageRef.current, {
      x: magneticX,
      y: magneticY,
      duration: 0.45,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleImageMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.65,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  };

  const handleImageMouseEnter = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      scale: 1.12,
      duration: 0.55,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
        transition: isHovered ? 'transform 0.08s ease-out, shadow 0.4s ease' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), shadow 0.6s ease',
        transformStyle: 'preserve-3d',
      }}
      className="gsap-stagger-item group relative bg-slate-50/60 rounded-3.5xl p-6 border border-slate-100/80 hover:bg-white hover:border-primary/25 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-default flex flex-col justify-between overflow-hidden"
    >
      {/* Glare/Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 0.6 : 0,
          background: `radial-gradient(circle 180px at ${coords.x}px ${coords.y}px, rgba(14, 165, 233, 0.16), transparent 85%)`,
        }}
      />

      {/* Subtle ambient spotlight for secondary depth */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 z-10"
        style={{
          opacity: isHovered ? 0.4 : 0,
          background: `radial-gradient(circle 280px at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.3), transparent 100%)`,
        }}
      />

      <div style={{ transform: 'translateZ(30px)' }} className="transition-transform duration-300 relative z-20 flex flex-col h-full">
        {/* Profile Image Container */}
        <div 
          ref={containerRef}
          onMouseMove={handleImageMouseMove}
          onMouseLeave={handleImageMouseLeave}
          onMouseEnter={handleImageMouseEnter}
          className="relative w-full h-72 rounded-2.5xl overflow-hidden mb-6 border border-slate-100 shadow-inner bg-slate-100 cursor-pointer"
        >
          <img 
            ref={imageRef}
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/15 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />
          
          {/* Experience Badge */}
          {member.experience && (
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-primary font-semibold text-xs py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-md border border-white/50 pointer-events-none">
              <Briefcase className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{member.experience}</span>
            </div>
          )}

          {/* Role and Name Layer */}
          <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
            <span className="text-xs font-bold tracking-widest uppercase text-cyan-300 block mb-1">
              {member.role}
            </span>
            <h4 className="font-display font-extrabold text-xl leading-tight">
              {member.name}
            </h4>
          </div>
        </div>

        {/* Bio, Certification and Expertise */}
        <div className="flex-grow flex flex-col justify-between space-y-4">
          {member.bio && (
            <p className="text-slate-600 text-sm leading-relaxed italic group-hover:text-slate-700 transition-colors">
              "{member.bio}"
            </p>
          )}

          <div className="space-y-3 pt-3 border-t border-slate-100">
            {/* Certification */}
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold font-mono">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />
              <span className="tracking-wide uppercase">{member.certification}</span>
            </div>

            {/* Expertise Tags */}
            {member.expertise && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {member.expertise.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-50/70 text-primary border border-blue-100/50 group-hover:bg-blue-100/80 group-hover:border-blue-200 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState<'missao' | 'visao' | 'valores'>('missao');

  const tabContent = {
    missao: {
      title: 'Nossa Missão',
      text: 'Garantir a integridade estrutural, impermeabilização e valorização estética das piscinas e reservatórios de nossos clientes através de engenharia civil de elite, revestimentos de alto padrão e impermeabilização definitiva com fibra.',
      icon: <Target className="w-6 h-6 text-primary" />,
      color: 'bg-blue-500/10 text-primary border-primary/20'
    },
    visao: {
      title: 'Nossa Visão',
      text: 'Ser a empresa de referência absoluta em reformas, revitalização e impermeabilização com fibra de vidro no Rio Grande do Sul, reconhecida pela excelência técnica, prazos rigorosos e laudos periciais.',
      icon: <BookOpen className="w-6 h-6 text-accent" />,
      color: 'bg-cyan-500/10 text-accent border-accent/20'
    },
    valores: {
      title: 'Nossos Valores',
      text: 'Segurança de engenharia, durabilidade estendida (garantia real em contrato), transparência técnica, respeito ao meio ambiente (combate ao desperdício de água por vazamentos) e pontualidade na entrega de obras.',
      icon: <Heart className="w-6 h-6 text-emerald-500" />,
      color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    }
  };

  const highlights = [
    'Mais de 20 anos de experiência sólida na construção civil.',
    '5 anos de especialização técnica em fibra, alvenaria e concreto.',
    'Laudo de impermeabilização e garantia estrutural em contrato.',
    'Equipe própria qualificada, uniformizada e segurada (sem freelancers).'
  ];

  return (
    <section id="sobre" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Absolute Decorative Blobs */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-100/40 rounded-full filter blur-3xl animate-pulse-slow select-none pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-cyan-100/30 rounded-full filter blur-3xl animate-pulse-slow select-none pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Info Split Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Representation & Floating Experience Card */}
          <div className="lg:col-span-5 relative gsap-reveal-left">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80" 
                alt="Técnico realizando análise de água" 
                className="w-full h-[32rem] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            </div>

            {/* Float Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-6 -right-4 sm:-right-6 glass-card p-6 rounded-2xl max-w-xs shadow-xl border border-white"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white shadow-md shadow-primary/25">
                  <Award className="w-6 h-6 animate-spin-slow" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-2xl text-slate-900 leading-none">100%</h4>
                  <p className="text-xs font-semibold text-slate-500 uppercase mt-1 tracking-wider">Laudos Técnicos ART</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: History and Pillars */}
          <div className="lg:col-span-7 space-y-8 gsap-reveal-right">
            <div>
              <span className="text-xs font-bold tracking-widest text-primary uppercase font-mono">
                Quem Somos
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-slate-900 tracking-tight mt-2">
                Mais de 20 Anos de Excelência em <br />
                Construção Civil & Reformas de Piscinas
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4" />
            </div>

            <p className="text-slate-600 leading-relaxed text-base sm:text-md">
              A <strong className="text-slate-900">Renova</strong> nasceu da solidez de mais de duas décadas de atuação na construção civil. Nos últimos 5 anos, nos tornamos referência especializada em engenharia de piscinas: reformas estruturais, impermeabilização definitiva com fibra de vidro, revitalização de superfícies e localização precisa de vazamentos em Porto Alegre e Região Metropolitana.
            </p>

            {/* Interactive Pillar Selector (Tab-style) */}
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 grid grid-cols-3 gap-1">
              {(['missao', 'visao', 'valores'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tabContent[tab].title}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 flex gap-4"
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${tabContent[activeTab].color}`}>
                {tabContent[activeTab].icon}
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900 text-lg">
                  {tabContent[activeTab].title}
                </h4>
                <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                  {tabContent[activeTab].text}
                </p>
              </div>
            </motion.div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specialized Team Grid */}
        <div className="mt-24 pt-12 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-primary uppercase font-mono">
              Especialistas Certificados
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-2">
              Nossa Equipe de Operações
            </h3>
            <p className="text-slate-500 text-sm mt-3">
              Não terceirizamos. Contamos com um corpo técnico próprio de engenharia civil, técnicos em edificações e laminadores experientes para executar seu projeto com perfeição e segurança.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gsap-stagger-container">
            {teamMembers.map((member, idx) => (
              <TeamMemberCard key={member.id} member={member} idx={idx} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
