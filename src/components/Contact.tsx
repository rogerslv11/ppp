import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  ShieldCheck,
  Building,
  Home,
  Waves,
  Briefcase,
} from 'lucide-react';

type TipoPiscina = 'residencial' | 'condominio' | 'clube' | 'hotel';
type TamanhoPiscina = 'pequena' | 'media' | 'grande' | 'olimpica';

export default function Contact() {
  // Form Field States
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoPiscina: 'residencial' as TipoPiscina,
    tamanhoPiscina: 'media' as TamanhoPiscina,
    urgente: false,
    mensagem: ''
  });

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [protocol, setProtocol] = useState('');
  // Field Change Handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectTipo = (tipo: TipoPiscina) => {
    setFormData(prev => ({ ...prev, tipoPiscina: tipo }));
  };

  const handleSelectTamanho = (tamanho: TamanhoPiscina) => {
    setFormData(prev => ({ ...prev, tamanhoPiscina: tamanho }));
  };

  const handleToggleUrgente = () => {
    setFormData(prev => ({ ...prev, urgente: !prev.urgente }));
  };

  // Validation Validator
  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    
    if (!formData.nome.trim()) {
      tempErrors.nome = 'Por favor, informe seu nome.';
    } else if (formData.nome.trim().length < 3) {
      tempErrors.nome = 'O nome deve ter no mínimo 3 caracteres.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'O e-mail é obrigatório para contato.';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Informe um formato de e-mail válido.';
    }

    if (!formData.telefone.trim()) {
      tempErrors.telefone = 'Por favor, informe seu WhatsApp ou telefone.';
    } else if (formData.telefone.replace(/\D/g, '').length < 10) {
      tempErrors.telefone = 'Informe um número de telefone com DDD válido.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate server POST with a beautiful delay
    setTimeout(() => {
      setIsSubmitting(false);
      setProtocol(`RN-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitSuccess(true);
      // Reset state
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        tipoPiscina: 'residencial',
        tamanhoPiscina: 'media',
        urgente: false,
        mensagem: ''
      });
    }, 1500);
  };

  return (
    <section id="contato" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
      {/* Wave bottom separator */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden select-none pointer-events-none bg-white">
        <svg className="absolute bottom-0 w-full h-10 text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,10 500,60 C650,110 850,20 1000,70 C1150,120 1250,50 1300,30 L1300,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>

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

      {/* Decorative ambient bubbles */}
      <div className="absolute top-1/3 -left-40 w-[450px] h-[450px] bg-blue-100/20 rounded-full filter blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/3 -right-40 w-[450px] h-[450px] bg-cyan-100/20 rounded-full filter blur-3xl pointer-events-none animate-pulse-slow" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24 gsap-reveal">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase font-mono px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Central de Atendimento
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4.5xl text-slate-900 tracking-tight mt-6 leading-none">
            Agende uma Avaliação Técnica
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-5 mx-auto" />
          <p className="text-slate-500 text-sm sm:text-base mt-5 leading-relaxed">
            Preencha o formulário e nosso time retornará via WhatsApp para agendar uma vistoria técnica e emitir o orçamento detalhado de sua piscina.
          </p>
        </div>

        {/* Contact Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Left Column: Form with dynamic states */}
          <div className="lg:col-span-7 flex flex-col justify-center gsap-reveal-left">
            <div className="bg-white rounded-3.5xl p-6 sm:p-10 border border-slate-100 shadow-xl shadow-blue-500/5 relative overflow-hidden h-full flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    {/* Basic personal info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          placeholder="Ex: Roberto Mendes"
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all ${
                            errors.nome 
                              ? 'border-red-300 focus:border-red-500 bg-red-50/10' 
                              : 'border-slate-100 bg-slate-50/50 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 text-slate-800'
                          }`}
                        />
                        {errors.nome && (
                          <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.nome}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono">
                          WhatsApp / Telefone *
                        </label>
                        <input
                          type="tel"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleChange}
                          placeholder="Ex: (11) 99999-9999"
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all ${
                            errors.telefone 
                              ? 'border-red-300 focus:border-red-500 bg-red-50/10' 
                              : 'border-slate-100 bg-slate-50/50 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 text-slate-800'
                          }`}
                        />
                        {errors.telefone && (
                          <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.telefone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono">
                        E-mail de Contato *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Ex: roberto.mendes@gmail.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all ${
                          errors.email 
                            ? 'border-red-300 focus:border-red-500 bg-red-50/10' 
                            : 'border-slate-100 bg-slate-50/50 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 text-slate-800'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* CUSTOM CARD SELECTOR FOR POOL TYPE */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">
                        Tipo de Imóvel / Piscina
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { id: 'residencial', label: 'Residencial', desc: 'Casa Privativa', icon: <Home className="w-4 h-4" /> },
                          { id: 'condominio', label: 'Condomínio', desc: 'Prédios/Síndico', icon: <Building className="w-4 h-4" /> },
                          { id: 'clube', label: 'Clube', desc: 'Alto Fluxo', icon: <Briefcase className="w-4 h-4" /> },
                          { id: 'hotel', label: 'Hotel / Spa', desc: 'Comercial', icon: <Waves className="w-4 h-4" /> }
                        ].map((tipo) => (
                          <button
                            key={tipo.id}
                            type="button"
                            onClick={() => handleSelectTipo(tipo.id as TipoPiscina)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                              formData.tipoPiscina === tipo.id
                                ? 'border-primary bg-blue-50/25 text-primary shadow-sm'
                                : 'border-slate-100 bg-slate-50/40 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                              formData.tipoPiscina === tipo.id ? 'bg-primary/10 text-primary' : 'bg-white border border-slate-100 text-slate-400'
                            }`}>
                              {tipo.icon}
                            </div>
                            <div>
                              <p className="font-bold text-xs font-display leading-tight">{tipo.label}</p>
                              <p className="text-[9px] text-slate-400 font-mono mt-0.5 leading-none">{tipo.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* CUSTOM SLIDER/TAB SELECTOR FOR VOLUME */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">
                        Volume da Piscina (Litros)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { id: 'pequena', label: 'Até 20.000L', desc: 'Pequeno Porte' },
                          { id: 'media', label: '20k a 60k L', desc: 'Médio Porte' },
                          { id: 'grande', label: '60k a 120k L', desc: 'Grande Porte' },
                          { id: 'olimpica', label: 'Acima 120k L', desc: 'Olímpica/Parques' }
                        ].map((tam) => (
                          <button
                            key={tam.id}
                            type="button"
                            onClick={() => handleSelectTamanho(tam.id as TamanhoPiscina)}
                            className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-center ${
                              formData.tamanhoPiscina === tam.id
                                ? 'border-primary bg-primary text-white shadow-md'
                                : 'border-slate-100 bg-slate-50/40 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <p className="font-bold text-xs font-display leading-tight">{tam.label}</p>
                            <p className={`text-[9px] font-mono mt-0.5 leading-none ${
                              formData.tamanhoPiscina === tam.id ? 'text-blue-100' : 'text-slate-400'
                            }`}>{tam.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* URGENCY TOGGLE ROW */}
                    <div className="p-4.5 rounded-2.5xl bg-slate-50 border border-slate-100/80 flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                          Vazamento ou Dano Estrutural Grave?
                        </span>
                        <p className="text-[10px] sm:text-xs text-slate-500 leading-normal">
                          Marque esta opção se houver perda rápida de água, fissura visível ou risco estrutural iminente na piscina.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleToggleUrgente}
                        className={`w-12 h-6.5 rounded-full p-0.5 transition-colors cursor-pointer focus:outline-none ${
                          formData.urgente ? 'bg-rose-500' : 'bg-slate-200'
                        }`}
                      >
                        <div className={`w-5.5 h-5.5 rounded-full bg-white shadow-md transform transition-transform ${
                          formData.urgente ? 'translate-x-5.5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    {/* Message input */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono">
                          Observações Técnicas (Opcional)
                        </label>
                        <span className="text-[10px] font-mono text-slate-400">Máx. 500 caract.</span>
                      </div>
                      <textarea
                        name="mensagem"
                        rows={3}
                        value={formData.mensagem}
                        onChange={handleChange}
                        maxLength={500}
                        placeholder="Descreva a necessidade da sua piscina: vazamentos conhecidos, desgaste de revestimento, fissuras, reformas desejadas ou decks de madeira."
                        className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 text-slate-800 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-sm font-bold text-white bg-primary hover:bg-primary-dark shadow-lg shadow-primary/25 hover:shadow-primary/35 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4.5 h-4.5 animate-spin" />
                          <span>Processando sua Solicitação...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Confirmar Solicitação de Orçamento</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  /* Success Screen State with elegant check animation */
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center space-y-6 max-w-md mx-auto"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-lg shadow-emerald-500/5"
                    >
                      <CheckCircle className="w-9 h-9" />
                    </motion.div>

                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-slate-950 text-2.5xl leading-tight">
                        Laudo de Solicitação Gerado!
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                        Sua solicitação de vistoria foi recebida. Um engenheiro de nossa equipe entrará em contato via WhatsApp para confirmar o agendamento da visita técnica no Rio Grande do Sul.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500 font-mono space-y-1">
                      <div>
                        <span>Nº de Protocolo: </span>
                        <strong className="text-slate-850 font-bold">{protocol}</strong>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Status: <span className="text-amber-500 font-semibold uppercase font-sans">Aguardando Triagem Comercial</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl text-xs transition-all cursor-pointer"
                    >
                      Gerar Nova Solicitação
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Right Column: Contacts info & Google Maps Embed */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 gsap-reveal-right">
            {/* Context contact card with beautiful tabs */}
            <div className="bg-white rounded-3.5xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-blue-500/5 flex-grow flex flex-col justify-between relative overflow-hidden">
              {/* Decorative Blueprint Corner Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none rounded-bl-full" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                  <h3 className="font-display font-bold text-slate-900 text-lg">
                    Canais Corporativos
                  </h3>
                  <div className="px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 font-mono text-[9px] font-bold rounded uppercase">
                    Suporte Especializado
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Contact phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50/70 text-primary flex items-center justify-center shrink-0 border border-blue-50/50 shadow-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest leading-none">
                        Telefone & WhatsApp
                      </h4>
                      <p className="text-slate-800 font-bold text-sm sm:text-base mt-1.5 hover:text-primary transition-colors">
                        <a href="https://wa.me/5551985733001">+55 (51) 98573-3001</a>
                      </p>
                      <p className="text-[10px] text-emerald-600 font-mono font-medium mt-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Retorno médio em 5 minutos
                      </p>
                    </div>
                  </div>

                  {/* Contact email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50/70 text-primary flex items-center justify-center shrink-0 border border-blue-50/50 shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest leading-none">
                        E-mail Corporativo
                      </h4>
                      <p className="text-slate-800 font-bold text-sm sm:text-base mt-1.5 hover:text-primary transition-colors">
                        <a href="mailto:renovapiscina1973@gmail.com">renovapiscina1973@gmail.com</a>
                      </p>
                    </div>
                  </div>

                  {/* Operating hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50/70 text-primary flex items-center justify-center shrink-0 border border-blue-50/50 shadow-sm">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest leading-none">
                        Horário de Atendimento
                      </h4>
                      <p className="text-slate-700 text-xs sm:text-sm font-semibold mt-1.5 leading-relaxed">
                        Segunda a Sexta: 08h às 18h <br />
                        Sábados: 08h às 13h <span className="text-[10px] text-emerald-500 font-mono font-bold">(Plantão Técnico)</span>
                      </p>
                    </div>
                  </div>

                  {/* Corporate Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50/70 text-primary flex items-center justify-center shrink-0 border border-blue-50/50 shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest leading-none">
                        Sede Operacional / Logística
                      </h4>
                      <p className="text-slate-700 text-xs sm:text-sm font-semibold mt-1.5 leading-relaxed font-sans">
                        Rua Itapetininga 178 - São Judas Tadeu <br />
                        Gravataí - RS, CEP 94075-040
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social icons & bottom brand */}
              <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest leading-none">
                    Redes Sociais
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-none font-medium">Siga nosso cotidiano técnico</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {[
                    { icon: <Instagram className="w-4 h-4" />, link: 'https://instagram.com', label: 'Instagram' },
                    { icon: <Facebook className="w-4 h-4" />, link: 'https://facebook.com', label: 'Facebook' },
                    { icon: <Linkedin className="w-4 h-4" />, link: 'https://linkedin.com', label: 'LinkedIn' },
                    { icon: <Youtube className="w-4 h-4" />, link: 'https://youtube.com', label: 'YouTube' }
                  ].map((soc, index) => (
                    <a
                      key={index}
                      href={soc.link}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="w-8.5 h-8.5 rounded-xl bg-slate-50 hover:bg-primary hover:text-white text-slate-500 flex items-center justify-center transition-all shadow-sm"
                      title={soc.label}
                    >
                      {soc.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Embedded maps iframe container */}
            <div className="bg-white rounded-3.5xl overflow-hidden border border-slate-100 shadow-xl shadow-blue-500/5 h-[14rem] relative">
              <iframe
                title="Google Maps - Sede Renova"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.7997380962776!2d-51.221085!3d-30.046556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951978508e33005f%3A0xe5a3666ca0b2f32f!2sAv.%20Get%C3%BAlio%20Vargas%2C%20Porto%20Alegre%20-%20RS!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
