import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Instagram, X, Sparkles } from 'lucide-react';

const LOOKS = [
  {
    id: 1,
    title: 'Royal Wedding Heritage',
    tagline: 'Bridal Kanjeevaram & Gold Zari',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
    videoPreview: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 2,
    title: 'Midnight Soirée Glamour',
    tagline: 'Zardozi Velvet Lehenga Drapes',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000',
    videoPreview: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 3,
    title: 'The Varanasi Legacy',
    tagline: 'Kadwa Weave Banarasi Elegance',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000',
    videoPreview: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 4,
    title: 'Pearl & Organza Modernity',
    tagline: 'Contemporary Scalloped Silhouettes',
    image: 'https://images.unsplash.com/photo-1583391733975-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000',
    videoPreview: 'https://images.unsplash.com/photo-1583391733975-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000'
  }
];

export const VastraaEdit = () => {
  const [activeLook, setActiveLook] = useState(null);

  return (
    <section className="py-24 bg-ivory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold font-bold mb-2">
            <Instagram className="w-4 h-4 text-burgundy" /> @VASTRAA.OFFICIAL
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide text-burgundy">
            THE VASTRAA EDIT
          </h2>
          <p className="text-xs text-charcoal/70 uppercase tracking-widest mt-2">
            Cinematic moments & editorial styling looks
          </p>
        </div>

        {/* 4 Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOOKS.map((look) => (
            <motion.div
              key={look.id}
              whileHover={{ y: -6 }}
              onClick={() => setActiveLook(look)}
              className="relative aspect-[9/14] rounded-2xl overflow-hidden shadow-lg group cursor-pointer border border-gold/30"
            >
              <img
                src={look.image}
                alt={look.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-burgundy-deep/20 to-transparent group-hover:via-burgundy-deep/50 transition-colors" />

              {/* Play Button Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-burgundy/80 text-gold border border-gold/50 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-gold group-hover:text-burgundy transition-all shadow-gold">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-ivory z-10">
                <span className="text-[10px] uppercase tracking-widest text-gold font-semibold block mb-1">
                  EDITORIAL LOOK
                </span>
                <h3 className="font-serif text-xl font-bold">{look.title}</h3>
                <p className="text-xs text-ivory/80 font-sans mt-0.5 line-clamp-1">{look.tagline}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal Preview */}
      <AnimatePresence>
        {activeLook && (
          <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLook(null)}
              className="absolute inset-0 bg-charcoal/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 max-w-lg w-full bg-burgundy-deep text-ivory rounded-2xl p-6 border border-gold/40 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setActiveLook(null)}
                className="absolute top-4 right-4 p-2 text-ivory/60 hover:text-gold"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="aspect-[9/14] rounded-xl overflow-hidden mb-4 relative bg-charcoal">
                <img
                  src={activeLook.image}
                  alt={activeLook.title}
                  className="w-full h-full object-cover animate-pulse-slow"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40">
                  <div className="flex flex-col items-center text-center p-6 space-y-2">
                    <Sparkles className="w-8 h-8 text-gold animate-bounce" />
                    <p className="font-serif text-2xl font-bold text-gold-gradient">{activeLook.title}</p>
                    <p className="text-xs text-ivory/80">{activeLook.tagline}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
