import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUp, 
  ArrowRight, 
  Send, 
  CheckCircle2,
  ShieldCheck,
  Heart,
  Flame,
  Gauge
} from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onNavClick: (id: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);
  const [loading, setLoading] = useState(false);

  const quickLinks = [
    { label: 'Início', id: 'home' },
    { label: 'Sobre Nós', id: 'sobre' },
    { label: 'Serviços de Elite', id: 'servicos' },
    { label: 'Diferenciais', id: 'diferenciais' },
    { label: 'Como Trabalhamos', id: 'como-trabalhamos' },
    { label: 'Antes e Depois', id: 'antes-depois' },
    { label: 'Depoimentos', id: 'depoimentos' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Fale Conosco', id: 'contato' },
  ];

  const operationalServices = [
    { label: 'Reformas de Piscinas', id: 'servicos' },
    { label: 'Revitalização e Pintura', id: 'servicos' },
    { label: 'Impermeabilização com Fibra', id: 'servicos' },
    { label: 'Correção de Vazamentos', id: 'servicos' },
    { label: 'Recuperação Estrutural', id: 'servicos' },
    { label: 'Decks de Madeira Nobre', id: 'servicos' },
  ];

  const handleNavClickInternal = (id: string) => {
    onNavClick(id);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubbed(true);
      setEmail('');
    }, 1200);
  };

  return (
    <footer className="bg-brand-dark text-slate-300 pt-20 pb-12 relative overflow-hidden">
      
      {/* Subtle glowing ambient spots */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl -z-10" />

      {/* Decorative Border Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* UPPER PART: BRAND & NEWSLETTER ACTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-white/5 items-center">
          {/* Logo & Slogan info */}
          <div className="lg:col-span-5 space-y-3">
            <div 
              onClick={() => handleNavClickInternal('home')}
              className="cursor-pointer group w-fit"
            >
              <Logo size="md" dark={true} />
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              A excelência técnica que sua piscina residencial ou de condomínio merece. Desenvolvemos soluções inteligentes com foco em impermeabilização, reformas e laudos de engenharia.
            </p>
          </div>

          {/* Premium Newsletter sign-up box */}
          <div className="lg:col-span-7 bg-white/2.5 border border-white/5 p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-left max-w-sm">
              <span className="text-[9px] font-mono font-bold tracking-widest text-accent uppercase block">Informativo Mensal</span>
              <h4 className="font-display font-bold text-white text-base">Receba Dicas de Valorização & Reformas</h4>
              <p className="text-slate-400 text-xs leading-normal">
                Conteúdos elaborados por engenheiros experientes sobre conservação e impermeabilização de piscinas.
              </p>
            </div>

            <div className="w-full md:w-auto min-w-[280px] shrink-0">
              <AnimatePresence mode="wait">
                {!subbed ? (
                  <motion.form 
                    key="newsletter-form"
                    onSubmit={handleSubscribe} 
                    className="flex gap-2 relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <input
                      type="email"
                      required
                      placeholder="Seu melhor e-mail..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 bg-accent hover:bg-accent-light text-brand-dark rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer shrink-0 disabled:opacity-50"
                      title="Inscrever-se"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="newsletter-success"
                    className="flex items-center gap-2 text-emerald-400 font-bold text-xs bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-500/20"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                    <span>Inscrição Confirmada com Sucesso!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* MIDDLE PART: 4-COLUMN DETAILED RESOURCES & ACCREDITATIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-16 border-b border-white/5">
          
          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-display font-bold text-white text-xs tracking-widest uppercase border-l-2 border-primary pl-3">
              Mapa do Site
            </h5>
            <div className="grid grid-cols-1 gap-2.5">
              {quickLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClickInternal(link.id)}
                  className="w-fit text-left text-xs text-slate-400 hover:text-white flex items-center gap-1.5 group transition-all duration-150 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-accent transform group-hover:translate-x-0.5 transition-all" />
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Operational Services Column */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-display font-bold text-white text-xs tracking-widest uppercase border-l-2 border-primary pl-3">
              Serviços Especializados
            </h5>
            <div className="grid grid-cols-1 gap-2.5">
              {operationalServices.map((srv, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClickInternal(srv.id)}
                  className="w-fit text-left text-xs text-slate-400 hover:text-white flex items-center gap-1.5 group transition-all duration-150 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-accent transform group-hover:translate-x-0.5 transition-all" />
                  <span>{srv.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-display font-bold text-white text-xs tracking-widest uppercase border-l-2 border-primary pl-3">
              Contatos Rápidos
            </h5>
            <div className="space-y-4.5 text-xs text-slate-400 font-mono">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">Av. Getúlio Vargas, 1200 - Menino Deus, Porto Alegre - RS, 90150-002</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>+55 (51) 99999-9999</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="break-all">engenharia@piscinacleanpro.com.br</span>
              </div>
            </div>
          </div>

          {/* Certifications Credibility Column */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-display font-bold text-white text-xs tracking-widest uppercase border-l-2 border-primary pl-3">
              Credenciamento Técnico
            </h5>
            <div className="space-y-4 text-xs text-slate-400 leading-relaxed">
              <p>
                Operamos estritamente alinhados às normas técnicas de engenharia civil e segurança do CREA:
              </p>
              <div className="space-y-2 font-mono">
                <div className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/5 w-full flex items-center justify-between">
                  <span>CREA-RS:</span>
                  <span className="text-white font-bold">507.123-RS</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/5 w-full flex items-center justify-between">
                  <span>Laudo ART Coletivo:</span>
                  <span className="text-white font-bold">Habilitado</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-normal">
                Todas as reformas e impermeabilizações seguem rigorosamente as diretrizes das normas ABNT NBR 10339 e NBR 15575.
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM PART: TRADEMARKS & SECONDARY NAVIGATION */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-slate-500 border-t border-white/2.5 pt-8">
          <div className="space-y-1 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} Renova Ltda. Todos os direitos reservados.</p>
            <p className="font-mono">CNPJ: 12.345.678/0001-90 | Insc. Estadual: 123.456.789.110</p>
          </div>

          {/* Certifications visual badges */}
          <div className="flex items-center gap-3 text-slate-500 font-bold font-mono text-[9px] uppercase tracking-wider">
            <span className="px-2 py-1 bg-white/5 rounded border border-white/5">Anvisa Homologado</span>
            <span className="px-2 py-1 bg-white/5 rounded border border-white/5">ISO 9001</span>
          </div>

          {/* Scroll to top */}
          <button
            onClick={() => handleNavClickInternal('home')}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl border border-white/5 transition-all cursor-pointer font-bold text-xs uppercase tracking-wider"
          >
            <span>Subir</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
