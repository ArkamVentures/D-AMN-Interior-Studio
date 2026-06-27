import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary text-white"
    >
      <div className="relative flex flex-col items-center">
        {/* SVG Drawing Logo */}
        <svg
          className="w-24 h-24 mb-6 text-accent"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle frame */}
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {/* Letter D */}
          <motion.path
            d="M 32 30 L 32 70 C 48 70, 52 65, 52 50 C 52 35, 48 30, 32 30"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
          />
          {/* Letter A */}
          <motion.path
            d="M 52 70 L 66 30 L 80 70 M 57 56 L 75 56"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.4 }}
          />
        </svg>

        {/* Text */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-2xl font-serif font-semibold tracking-[0.25em] text-accent uppercase mb-2"
        >
          D-AMN
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-[9px] uppercase tracking-[0.4em] text-gray-400 font-light"
        >
          Interior & Aluminium Studio
        </motion.p>
      </div>

      {/* Progress Line */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/10 overflow-hidden">
        <motion.div
          initial={{ left: '-100%' }}
          animate={{ left: '0%' }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-accent w-full h-full"
        />
      </div>
    </motion.div>
  );
};
