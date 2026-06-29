import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Palette } from 'lucide-react';

export const AboutCeline: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a] text-white border-t border-b border-white/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Icon/Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 relative"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-[#C9A227] flex items-center justify-center bg-black shadow-[0_0_30px_rgba(201,162,39,0.15)]">
              <Palette className="w-10 h-10 md:w-12 md:h-12 text-[#C9A227]" />
            </div>
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-full border border-[#C9A227]/30 scale-[1.15]" />
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-left flex-grow"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#F4D03F]">Celine Interior</span>
            </h2>
            <p className="text-[#C9A227] text-sm md:text-base font-semibold tracking-wide uppercase mb-6">
              "We don't just build — we bring your vision to life."
            </p>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-2xl text-balance">
              Celine Interior — the design heart of D-AMN Aluminium Fabrication. We craft modern, functional spaces with premium aluminium, glass, and interior solutions. From kitchens to commercial fit-outs, we bring your vision to life with precision and style.
            </p>

            <a
              href="tel:+94773724849"
              className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-[#C9A227] text-white font-bold rounded-full hover:bg-[#C9A227] hover:text-black hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all duration-300 group"
            >
              Start Your Project — Call +94 77 372 4849
              <PhoneCall className="w-4 h-4 ml-3 group-hover:animate-pulse" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
