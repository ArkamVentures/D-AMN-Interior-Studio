import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, ChevronDown } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Hero: React.FC = () => {
  const { heroTitle, heroKeywords, contact, globalSettings } = useData();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Floating gold dust particles animation in canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: -Math.random() * 0.6 - 0.2, // Upward drifting
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Reset if it goes off screen
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10 || p.x > canvas.width + 10) {
          p.x = Math.random() * canvas.width;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 162, 39, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Helper for scroll action
  const handleScrollDown = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#000000] via-[#080808] to-[#0e0e0e] text-white">
      {/* 1. Canvas for Floating Gold Dust */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-70"
      />

      {/* 2. Slow Drifting Outlined Glass/Aluminium Geometric Panels */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Panel 1 */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 8, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/10 w-[250px] h-[400px] border border-[#C9A227]/30 rounded-xl"
        />

        {/* Panel 2 */}
        <motion.div
          animate={{
            y: [20, -20, 20],
            rotate: [0, -6, 0],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-1/10 w-[300px] h-[300px] border border-[#C9A227]/20 rounded-full"
        />

        {/* Diagonal Line 1 */}
        <motion.div
          animate={{
            opacity: [0.05, 0.1, 0.05],
            x: [-10, 10, -10],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-1/4 w-[2px] h-[600px] bg-gradient-to-b from-transparent via-[#C9A227]/30 to-transparent rotate-45"
        />
      </div>

      {/* 3. Brushed Aluminium Texture Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-5 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 4. Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Headline: D-AMN ALUMINIUM FABRICATION */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="text-xs md:text-sm font-bold tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] via-[#F4D03F] to-[#C9A227] uppercase mb-4"
        >
          {globalSettings.logoText} Aluminium Fabrication
        </motion.h2>

        {/* Subhead: We Engineer Modern Spaces That Last */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          {heroTitle.includes('<br />') ? (
            <span>{heroTitle}</span>
          ) : (
            heroTitle
          )}
        </motion.h1>

        {/* Staggered Service Keywords */}
        <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-3 mb-10 max-w-3xl">
          {heroKeywords.map((word, i) => (
            <React.Fragment key={word}>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 1.1 + i * 0.08,
                  ease: 'easeOut',
                }}
                className="text-xs sm:text-sm font-semibold tracking-wider text-gray-300 hover:text-[#C9A227] transition-colors"
              >
                {word}
              </motion.span>
              {i < heroKeywords.length - 1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 1.2 + i * 0.08 }}
                  className="text-[#C9A227] text-xs sm:text-sm"
                >
                  •
                </motion.span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Location & Guarantees */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.8, ease: 'easeOut' }}
          className="text-xs sm:text-sm md:text-base text-gray-400 font-light tracking-wide max-w-xl mb-12 border-t border-b border-white/10 py-3 text-balance"
        >
          Dharga Town, Sri Lanka <span className="text-[#C9A227]">|</span> Free Site Visit <span className="text-[#C9A227]">|</span> Best Price Guaranteed
        </motion.p>

        {/* CTA Button: BOOK NOW */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2.2, ease: 'easeOut' }}
          className="relative group"
        >
          {/* Subtle gold glow behind CTA */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#C9A227] to-[#F4D03F] rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-300" />

          <a
            href={`tel:${contact.phone.replace(/\s+/g, '')}`}
            className="relative flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[#C9A227] to-[#F4D03F] text-black font-bold text-sm tracking-widest rounded-full hover:shadow-[0_0_30px_rgba(201,162,39,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            BOOK NOW — {contact.phone}
            <Phone className="w-4 h-4 ml-3 animate-pulse text-black" />
          </a>
        </motion.div>
      </div>

      {/* 5. Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6, y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
          delay: 2.6,
        }}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-[54%] -translate-x-1/2 flex flex-col items-center cursor-pointer group z-10"
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#C9A227] transition-colors mb-2">
          Scroll to explore
        </span>
        <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-[#C9A227] transition-colors" />
      </motion.div>
    </section>
  );
};
