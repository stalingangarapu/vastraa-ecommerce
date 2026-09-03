import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

export const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('vastraa_welcome_seen');
    if (!seen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('vastraa_welcome_seen', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 max-w-md w-full glass-card-dark text-ivory p-8 rounded-2xl border border-gold/40 shadow-burgundy overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/20 rounded-full blur-2xl pointer-events-none" />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-ivory/60 hover:text-gold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-burgundy flex items-center justify-center border border-gold/40 mb-4 text-gold">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>

              <span className="text-xs uppercase tracking-[0.25em] text-gold mb-1">
                Exclusive Invitation
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-wide text-ivory mb-2">
                WELCOME TO VASTRAA
              </h2>
              <p className="text-ivory/80 text-sm font-sans mb-6 leading-relaxed">
                Discover timeless Indian craftsmanship, royal silks, and heritage couture reimagined for the modern patron.
              </p>

              <div className="w-full space-y-3">
                <button
                  onClick={handleClose}
                  className="w-full py-3.5 bg-gold-gradient text-charcoal font-semibold tracking-wider uppercase text-xs rounded-xl shadow-gold hover:brightness-110 transition-all"
                >
                  ENTER STORE
                </button>
                <p className="text-[10px] text-ivory/50 tracking-wider uppercase">
                  Use code <span className="text-gold font-bold">VASTRAA10</span> for 10% off your first order
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
