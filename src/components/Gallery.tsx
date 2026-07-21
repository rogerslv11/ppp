import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  X, 
  ChevronLeft,
  ChevronRight,
  Award,
} from 'lucide-react';
import { GalleryItem } from '../types';
import galleryDataRaw from '../data/gallery.json';

const galleryData = galleryDataRaw as {
  portfolioItems: GalleryItem[];
};

export default function Gallery() {
  const [galleryFilter, setGalleryFilter] = useState<'todos' | 'reforma' | 'impermeabilizacao' | 'vazamento'>('todos');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const nextLightboxImage = () => {
    if (!lightboxImage) return;
    setLightboxIndex((prev) => (prev + 1) % lightboxImage.images.length);
  };

  const prevLightboxImage = () => {
    if (!lightboxImage) return;
    setLightboxIndex((prev) => (prev - 1 + lightboxImage.images.length) % lightboxImage.images.length);
  };

  const filteredGallery = galleryFilter === 'todos'
    ? galleryData.portfolioItems
    : galleryData.portfolioItems.filter(item => item.category === galleryFilter);

  return (
    <section id="galeria" className="py-24 sm:py-32 bg-white relative overflow-hidden">
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

      <div className="absolute top-1/4 -right-40 w-[400px] h-[400px] bg-blue-100/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[450px] h-[450px] bg-cyan-100/25 rounded-full filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase font-mono px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            Casos de Sucesso
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4.5xl text-slate-900 tracking-tight mt-6 leading-none">
            Galeria de Serviços
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-5 mx-auto" />
        </div>

        <div>
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
                  onClick={() => {
                    setLightboxImage(item);
                    setLightboxIndex(0);
                  }}
                  className="group bg-slate-50/40 rounded-3.5xl p-4 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-64 sm:h-72 rounded-2.5xl overflow-hidden mb-4 bg-slate-100">
                      <img 
                        src={item.images[0]} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-11 h-11 rounded-full bg-white text-primary flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                          <Eye className="w-5.5 h-5.5" />
                        </div>
                      </div>
                      
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
                    <div className="flex items-center gap-1.5">
                      <div className="flex -space-x-1">
                        {item.images.slice(0, 3).map((img, i) => (
                          <div key={i} className="w-5 h-5 rounded-full border border-white overflow-hidden bg-slate-100">
                            <img src={img} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      <span className="text-primary font-bold">+{item.images.length} fotos</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {lightboxImage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-4xl w-full flex flex-col items-center"
              >
                <div className="relative w-full max-h-[75vh] flex items-center justify-center bg-slate-900 rounded-3xl overflow-hidden shadow-2xl group/modal">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={lightboxIndex}
                      src={lightboxImage.images[lightboxIndex]} 
                      alt={lightboxImage.title} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-full max-h-[70vh] object-contain"
                    />
                  </AnimatePresence>

                  {lightboxImage.images.length > 1 && (
                    <>
                      <button 
                        onClick={prevLightboxImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-all opacity-0 group-hover/modal:opacity-100 cursor-pointer"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={nextLightboxImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-all opacity-0 group-hover/modal:opacity-100 cursor-pointer"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-[10px] font-mono text-white/80">
                        {lightboxIndex + 1} / {lightboxImage.images.length}
                      </div>
                    </>
                  )}

                  <button
                    onClick={() => setLightboxImage(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 z-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-5 text-center max-w-xl text-white">
                  <span className="text-[9px] font-mono tracking-widest text-accent uppercase font-bold bg-white/10 px-3 py-1 rounded-lg">
                    {lightboxImage.category === 'reforma' ? 'Reforma Especializada' : lightboxImage.category === 'impermeabilizacao' ? 'Impermeabilização de Longa Duração' : 'Detecção e Reparo de Vazamento'}
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
