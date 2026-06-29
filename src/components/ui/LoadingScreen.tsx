import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(145deg, #0a0a0a 0%, #0E0E0E 50%, #111111 100%)' }}
    >
      <div className="relative flex flex-col items-center">
        {/* Main Logo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mb-6"
        >
          {/* Glow backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.3] }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute inset-0 blur-3xl rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.25) 0%, transparent 70%)' }}
          />

          {/* Logo SVG */}
          <svg
            className="w-28 h-28 sm:w-32 sm:h-32 relative z-10"
            viewBox="0 0 140 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer decorative ring */}
            <motion.circle
              cx="70"
              cy="70"
              r="65"
              stroke="#C9A227"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
            
            {/* Inner circle */}
            <motion.circle
              cx="70"
              cy="70"
              r="58"
              stroke="#C9A227"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.1 }}
            />

            {/* Diamond accent top */}
            <motion.path
              d="M 70 12 L 73 18 L 70 24 L 67 18 Z"
              fill="#C9A227"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            />

            {/* Letter D */}
            <motion.path
              d="M 35 45 L 35 95 C 55 95, 62 88, 62 70 C 62 52, 55 45, 35 45"
              stroke="#C9A227"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.3 }}
            />

            {/* Hyphen */}
            <motion.line
              x1="65"
              y1="70"
              x2="75"
              y2="70"
              stroke="#C9A227"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 1.0 }}
            />

            {/* Letter A */}
            <motion.path
              d="M 76 95 L 90 45 L 104 95 M 81 78 L 99 78"
              stroke="#C9A227"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.5 }}
            />

            {/* Small M accent */}
            <motion.path
              d="M 42 102 L 42 110 L 47 106 L 52 110 L 52 102"
              stroke="#C9A227"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            />

            {/* Small N accent */}
            <motion.path
              d="M 56 102 L 56 110 L 63 102 L 63 110"
              stroke="#C9A227"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            />
          </svg>

          {/* Shimmer overlay */}
          <motion.div
            className="absolute inset-0 z-20 overflow-hidden rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="loading-shimmer absolute inset-0" />
          </motion.div>
        </motion.div>

        {/* Brand Text */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-3xl sm:text-4xl font-serif font-bold tracking-[0.3em] uppercase mb-2"
          style={{ color: '#C9A227' }}
        >
          D-AMN
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '4rem' }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent mb-3"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-[10px] sm:text-xs uppercase tracking-[0.5em] text-gray-400 font-light"
        >
          Aluminium & Glass Fabrication
        </motion.p>
      </div>

      {/* Progress Line */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/10 overflow-hidden rounded-full">
        <motion.div
          initial={{ left: '-100%' }}
          animate={{ left: '0%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }}
        />
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-[#C9A227]/20" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-[#C9A227]/20" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-[#C9A227]/20" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-[#C9A227]/20" />
    </motion.div>
  );
};
