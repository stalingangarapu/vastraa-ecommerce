import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-burgundy-deep text-ivory overflow-hidden"
        >
          {/* Subtle gold particle background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent pointer-events-none" />

          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-3 relative z-10"
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-[0.25em] text-gold-gradient">
              VASTRAA
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-ivory/70 font-sans">
              Elegance in Every Thread
            </p>

            {/* Gold Loading Shimmer Line */}
            <div className="w-48 h-0.5 bg-ivory/20 rounded-full mt-6 overflow-hidden relative">
              <motion.div
                className="absolute top-0 bottom-0 bg-gold-gradient w-full"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
