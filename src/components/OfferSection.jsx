import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';

export const OfferSection = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-burgundy-deep text-ivory">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-burgundy-glow/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card-dark rounded-3xl p-8 sm:p-14 border border-gold/40 shadow-burgundy flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Text */}
          <div className="max-w-xl text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-burgundy/60 border border-gold/40 text-gold text-[11px] uppercase tracking-widest font-semibold">
              <Tag className="w-3.5 h-3.5" /> FESTIVE SEASON OFFERS
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide leading-tight text-ivory">
              A LITTLE MORE <span className="text-gold-gradient italic">ELEGANCE</span>
            </h2>

            <p className="text-ivory/80 text-sm sm:text-base font-sans font-light leading-relaxed">
              Exclusive styles crafted to make every occasion memorable. Enjoy celebratory discounts on royal silk sarees, designer lehengas, and curated 3-piece sets.
            </p>
          </div>

          {/* Right Offer Highlight & CTA */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right gap-6 shrink-0">
            <div className="p-6 rounded-2xl bg-burgundy/80 border border-gold/30 shadow-gold backdrop-blur-md">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                LIMITED TIME PROMOTION
              </span>
              <span className="font-serif text-5xl sm:text-6xl font-bold text-gold-gradient tracking-tight block">
                UP TO 40% OFF
              </span>
              <span className="text-[11px] text-ivory/70 tracking-widest uppercase mt-1 block">
                Use code <strong className="text-gold font-bold">ROYAL20</strong> at checkout
              </span>
            </div>

            <Link
              to="/shop?filter=offers"
              className="px-8 py-4 bg-gold-gradient text-charcoal font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-gold hover:brightness-110 hover:scale-105 transition-all flex items-center gap-3 group"
            >
              SHOP OFFERS
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
