import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Hero3D } from './Hero3D';

export const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-burgundy-deep text-ivory pt-20">
      {/* 3D WebGL / Fallback Canvas */}
      <Hero3D />

      {/* Editorial Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Animated Gold Emblem */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 px-4 py-2 rounded-full border border-gold/40 bg-burgundy-dark/80 backdrop-blur-md mb-6 shadow-gold"
        >
          <Sparkles className="w-4 h-4 text-gold animate-pulse" />
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-bold">
            TRADITIONAL INDIAN WEAVES SINCE 1996 • HONEST PRICING
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-wider leading-[1.08] text-ivory mb-6"
        >
          ELEGANCE IN EVERY <span className="text-gold-gradient italic font-normal">THREAD</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="text-base sm:text-xl text-ivory/90 max-w-2xl font-sans font-light tracking-wide mb-8 leading-relaxed"
        >
          Discover authentic Gadwal handlooms, Kanchi Pattu silks, Pellikuthuru bridal lehengas, and Banarasi weaves at honest prices.
        </motion.p>

        {/* Quick Weave Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-2 mb-10 text-xs font-semibold text-gold/90"
        >
          <span className="px-3 py-1 rounded-full bg-burgundy/60 border border-gold/30">#GadwalSarees</span>
          <span className="px-3 py-1 rounded-full bg-burgundy/60 border border-gold/30">#KanchiPattu</span>
          <span className="px-3 py-1 rounded-full bg-burgundy/60 border border-gold/30">#PellikuthuruLehengas</span>
          <span className="px-3 py-1 rounded-full bg-burgundy/60 border border-gold/30">#MangalagiriHandlooms</span>
        </motion.div>

        {/* CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link
            to="/shop"
            className="px-8 py-4 bg-gold-gradient text-charcoal font-sans font-bold text-xs sm:text-sm uppercase tracking-[0.2em] rounded-full shadow-gold hover:brightness-110 hover:scale-105 transition-all flex items-center justify-center gap-3 group"
          >
            SHOP HERITAGE COLLECTION
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/shop?filter=new"
            className="px-8 py-4 bg-burgundy/80 text-ivory border border-gold/50 font-sans font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] rounded-full backdrop-blur-md hover:bg-gold hover:text-charcoal hover:border-gold hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            EXPLORE NEW WEAVES
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-14 sm:mt-16 flex flex-col items-center gap-2 text-gold/70 hover:text-gold transition-colors cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
          }}
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold font-sans">
            SCROLL TO DISCOVER
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-gold" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
