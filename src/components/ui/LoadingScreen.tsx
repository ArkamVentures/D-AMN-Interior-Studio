import React from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000000]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        opacity: { duration: 0.7, delay: 2.5, ease: 'easeInOut' },
      }}
      onAnimationComplete={onComplete}
    >
      {/* Pulsing background glow */}
      <motion.div
        animate={{ opacity: [0, 0.35, 0] }}
        transition={{ duration: 2, delay: 0.3, repeat: 1, ease: 'easeInOut' }}
        className="absolute w-[300px] md:w-[400px] h-[100px] bg-[#C9A227]/20 blur-[60px] rounded-full pointer-events-none"
      />

      {/* Aluminium texture overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-8 px-6">

        {/* Cabinet Icon */}
        <motion.div
          initial={{ opacity: 0, filter: 'drop-shadow(0px 0px 0px rgba(255,255,255,0))' }}
          animate={{ opacity: 1, filter: 'drop-shadow(0px 0px 8px rgba(255,255,255,0.3))' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex-shrink-0"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="square"
            className="w-20 h-20 md:w-24 md:h-24"
          >
            <rect x="15" y="15" width="70" height="65" />
            <line x1="45" y1="15" x2="45" y2="80" />
            <line x1="45" y1="36.6" x2="85" y2="36.6" />
            <line x1="45" y1="58.3" x2="85" y2="58.3" />
            <rect x="35" y="42" width="2" height="10" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1" />
            <rect x="60" y="25" width="10" height="1" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1" />
            <rect x="60" y="47" width="10" height="1" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1" />
            <rect x="60" y="69" width="10" height="1" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="20" y1="88" x2="80" y2="88" strokeWidth="4" />
          </svg>
        </motion.div>

        {/* D-AMN Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="flex flex-col justify-center text-center sm:text-left"
        >
          <div className="relative overflow-hidden">
            <h1 className="text-[2.75rem] md:text-6xl font-bold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] via-[#F4D03F] to-[#C9A227] pb-1">
              D-AMN
            </h1>
            {/* Shimmer sweep */}
            <motion.div
              initial={{ left: '-100%' }}
              animate={{ left: '200%' }}
              transition={{ duration: 1.2, delay: 1, ease: 'easeInOut' }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none mix-blend-overlay"
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9, ease: 'easeOut' }}
            className="text-[#B8860B] text-[8px] md:text-[10px] tracking-[0.45em] font-medium uppercase mt-1 pl-1"
          >
            Aluminum Fabrication
          </motion.p>
        </motion.div>

      </div>
    </motion.div>
  );
};
