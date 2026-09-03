import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRICE_FILTERS } from '../data/products';

export const ShopByPrice = () => {
  return (
    <section className="py-24 bg-burgundy-deep text-ivory relative overflow-hidden">
      {/* Background Decorative Gold Dust */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-bold block mb-2">
            CURATED BUDGETS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide text-ivory">
            SHOP BY PRICE
          </h2>
          <div className="w-16 h-0.5 bg-gold-gradient mx-auto mt-4" />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICE_FILTERS.map((item, idx) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="glass-card-dark rounded-2xl p-8 border border-gold/30 hover:border-gold shadow-burgundy flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-burgundy/60 border border-gold/40 flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold/80 font-semibold block mb-1">
                  SELECTION 0{idx + 1}
                </span>
                <h3 className="font-serif text-2xl font-bold text-ivory group-hover:text-gold-gradient transition-colors mb-3">
                  {item.label}
                </h3>
                <p className="text-xs text-ivory/70 font-sans font-light leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <Link
                to={`/shop?maxPrice=${item.maxPrice}`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold group-hover:gap-3 transition-all"
              >
                EXPLORE RANGE <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
