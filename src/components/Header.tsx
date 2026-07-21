import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import logoSrc from '../imgs/Logo.png'

interface HeaderProps {
  onNavClick: (id: string) => void;
}

export default function Header({ onNavClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  // Exact list of 6 premium, highly structured navigation items
  const navItems = [
    { label: 'Início', id: 'home' },
    { label: 'Serviços', id: 'servicos' },
    { label: 'Diferenciais', id: 'diferenciais' },
    { label: 'Sobre Nós', id: 'sobre' },
    { label: 'Galeria', id: 'galeria' },
    { label: 'Contato', id: 'contato' },
  ];

  // Active section scroll detection & progress bar calculation
  useEffect(() => {
    const handleScroll = () => {
      // Background shift when scrolling
      setIsScrolled(window.scrollY > 40);

      // Scroll progress percentage calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Detect which section is currently active in viewport
      const scrollPosition = window.scrollY + 140; // Offset for header density
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call to set active section
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClickInternal = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavClick(id);
    setActiveSection(id);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-blue-50/20">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-75 shadow-[0_0_8px_rgba(0,119,255,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        id="main-header"
        className={`fixed left-0 right-0 mx-auto w-[95%] sm:w-[92%] max-w-7xl z-40 rounded-2xl transition-all duration-500 ${
          isScrolled 
            ? 'glass-header py-2.5 top-3' 
            : 'glass-header-top py-3.5 top-4'
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClickInternal('home')}
            className="cursor-pointer group"
          >
            <img src={logoSrc} alt="Logo" className="h-10 sm:h-11 w-auto" />
          </div>

          {/* Desktop Navigation (Exactly 6 Links) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/5 backdrop-blur-md p-1 rounded-xl border border-slate-200/10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClickInternal(item.id)}
                  className={`px-4.5 py-2 text-xs font-bold rounded-lg transition-all duration-300 relative cursor-pointer ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10 border border-slate-100"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClickInternal('contato')}
              className="px-4.5 py-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl shadow-sm transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-100"
            >
              Orçamento Rápido
            </button>
            <a
              href="https://wa.me/5551985733001?text=Ol%C3%A1%21+Gostaria+de+solicitar+um+or%C3%A7amento+especialista+para+minha+piscina."
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md shadow-green-500/15 rounded-xl transition-all duration-300 group cursor-pointer hover:scale-[1.02] hover:shadow-green-500/25 active:scale-100"
            >
              <Phone className="w-3.5 h-3.5 group-hover:animate-bounce" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>

          {/* Mobile Actions & Hamburguer Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="https://wa.me/5551999999999"
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center justify-center w-9 h-9 rounded-xl text-white bg-green-500 hover:bg-green-600 shadow-md shadow-green-500/10 transition-colors"
              title="Falar no WhatsApp"
            >
              <Phone className="w-4.5 h-4.5" />
            </a>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer border border-slate-200/50"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden backdrop-blur-sm"
            />

            {/* Menu Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85%] z-50 bg-white shadow-2xl p-6 flex flex-col justify-between lg:hidden rounded-l-3xl"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <img src={logoSrc} alt="Logo" className="h-8 w-auto" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8.5 h-8.5 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                <div className="flex flex-col gap-1.5 mt-6">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClickInternal(item.id)}
                        className={`w-full text-left px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">
                <button
                  onClick={() => handleNavClickInternal('contato')}
                  className="w-full py-3.5 text-center text-xs font-bold text-primary bg-blue-50/50 hover:bg-blue-100/50 border border-blue-100 rounded-xl transition-all duration-150"
                >
                  Solicitar Orçamento Presencial
                </button>
                <a
                  href="https://wa.me/5551999999999"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full py-3.5 text-center text-xs font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Falar no WhatsApp</span>
                </a>
                <p className="text-center text-[9px] text-slate-400 font-mono font-medium">
                  Atendimento em Porto Alegre & Região
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
