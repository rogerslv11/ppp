import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logoSrc from '../imgs/Logo.png'

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800); // Wait 1.8s for a beautiful initial experience
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-dark text-white select-none"
        >
          {/* Logo image */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <img src={logoSrc} alt="Logo" className="h-24 w-auto" />
            </motion.div>

            {/* Glowing pool light effect below */}
            <div className="mt-8 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="font-display font-bold text-3xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-accent uppercase"
              >
                RENOVA
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-2 text-xs font-mono tracking-widest text-accent uppercase"
              >
                Reforma e Especialista em Piscinas
              </motion.p>
            </div>
          </div>

          {/* Loading progress bar at bottom */}
          <div className="absolute bottom-12 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
