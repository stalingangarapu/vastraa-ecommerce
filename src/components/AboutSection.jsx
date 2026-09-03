import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-ivory-warm relative overflow-hidden border-t border-burgundy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Editorial Image Collage */}
          <div className="relative">
            <div className="relative z-10 aspect-[4/5] rounded-3xl overflow-hidden shadow-burgundy border-2 border-gold/40">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000"
                alt="The Art of Vastraa"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping Floating Emblem */}
            <div className="absolute -bottom-8 -right-8 z-20 glass-card-dark p-6 rounded-2xl border border-gold/40 shadow-gold hidden sm:flex flex-col items-center max-w-[200px] text-center">
              <Sparkles className="w-8 h-8 text-gold mb-2" />
              <span className="font-serif text-3xl font-bold text-gold-gradient">100%</span>
              <span className="text-[10px] uppercase tracking-widest text-ivory/80">AUTHENTIC HANDWOVEN WEAVES</span>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-burgundy/10 border border-burgundy/20 text-burgundy text-xs uppercase tracking-widest font-bold">
              HERITAGE & CRAFTSMANSHIP
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide text-burgundy leading-tight">
              THE ART OF <span className="italic text-gold-gradient">VASTRAA</span>
            </h2>

            <p className="text-base text-charcoal/80 font-sans font-light leading-relaxed">
              Vastraa celebrates the beauty of Indian craftsmanship through contemporary design. Every collection brings together centuries of weaving traditions, master artistry, and modern elegance.
            </p>

            <p className="text-sm text-charcoal/70 font-sans leading-relaxed">
              From the ancient looms of Varanasi and Kanchipuram to modern ateliers, our artisans infuse every silk thread with passion, heritage, and distinction.
            </p>

            {/* 3 Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-burgundy/10">
              <div className="p-4 rounded-xl bg-white border border-burgundy/10">
                <Award className="w-5 h-5 text-gold mb-2" />
                <h4 className="font-serif font-bold text-sm text-burgundy">Pure Silks</h4>
                <p className="text-[11px] text-charcoal/60 mt-1">Certified Silk Mark weaves</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-burgundy/10">
                <HeartHandshake className="w-5 h-5 text-gold mb-2" />
                <h4 className="font-serif font-bold text-sm text-burgundy">Artisan First</h4>
                <p className="text-[11px] text-charcoal/60 mt-1">Sustaining 500+ weaving families</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-burgundy/10">
                <ShieldCheck className="w-5 h-5 text-gold mb-2" />
                <h4 className="font-serif font-bold text-sm text-burgundy">Regal Quality</h4>
                <p className="text-[11px] text-charcoal/60 mt-1">Rigorous 12-point inspection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
