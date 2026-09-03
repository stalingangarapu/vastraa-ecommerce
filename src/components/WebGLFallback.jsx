import React from 'react';
import { motion } from 'framer-motion';

export const WebGLFallback = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-burgundy-deep via-burgundy-dark to-charcoal">
      {/* Animated glowing gold orb */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-burgundy-glow/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Floating gold dust particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-gold rounded-full opacity-70 shadow-gold"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: 4 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Silk Ribbon Organic Curves SVG */}
      <svg className="absolute w-full h-full opacity-25 stroke-gold" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <motion.path
          d="M0,300 C300,500 500,100 1000,400 L1000,1000 L0,1000 Z"
          fill="url(#goldGrad)"
          animate={{
            d: [
              "M0,300 C300,500 500,100 1000,400 L1000,1000 L0,1000 Z",
              "M0,400 C400,200 600,600 1000,300 L1000,1000 L0,1000 Z",
              "M0,300 C300,500 500,100 1000,400 L1000,1000 L0,1000 Z",
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#7B1E3A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#AA7C11" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
