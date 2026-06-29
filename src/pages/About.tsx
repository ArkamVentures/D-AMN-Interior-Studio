import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="pt-20 bg-[#050505] text-white min-h-screen relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-[#C9A227]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -left-1/4 w-[600px] h-[600px] bg-[#C9A227]/5 rounded-full blur-[120px]" />
      </div>

      {/* 1. Main Intro Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h2 className="text-sm font-semibold tracking-[0.2em] text-[#C9A227] uppercase mb-4">
            About Us
          </h2>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 leading-tight">
            The Complete <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] via-[#F4D03F] to-[#C9A227]">
              Interior Partner
            </span>
          </h1>

          <div className="w-20 h-1 bg-[#C9A227] mb-10 mx-auto md:mx-0" />

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6 max-w-3xl">
            D-AMN Aluminium Fabrication is a full-service interior and aluminium solutions studio based in Dharga Town, Sri Lanka. We specialize in aluminium doors & windows, tempered glass works, modern kitchen cabinets, gypsum & I-panel ceilings, ACP cladding, aluminium partitions, gutter works, and complete shop fittings.
          </p>
          
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12 max-w-3xl">
            Led by Nowful, an Interior Engineering undergraduate, we deliver premium craftsmanship with modern design, zero maintenance, and lasting durability — backed by free site visits and best price guarantee.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#C9A227] text-black font-bold rounded-xl hover:bg-white hover:text-black transition-colors shadow-[0_0_20px_rgba(201,162,39,0.3)]"
            >
              Explore Our Services
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#C9A227] text-white font-bold rounded-xl hover:bg-[#C9A227]/10 transition-colors"
            >
              Contact Us <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. Our Leadership / Team Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.25em] text-[#C9A227] font-semibold mb-3"
          >
            Behind the Craft
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-wide"
          >
            Our Leadership
          </motion.h3>
          <div className="w-12 h-[2px] bg-[#C9A227] mx-auto mt-4" />
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {/* Card 1: Founder & CEO Mohamed Nowful */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="group flex flex-col bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 hover:-translate-y-2 hover:border-[#C9A227]/40 hover:shadow-[0_10px_30px_rgba(201,162,39,0.1)] transition-all duration-500"
          >
            {/* Photo Crop */}
            <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-[3px] border-[#C9A227] flex-shrink-0">
              <motion.img
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                src="/founder.png"
                alt="Mohamed Nowful - Founder & CEO"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content info */}
            <div className="text-center flex-grow flex flex-col">
              <h4 className="text-2xl font-bold text-white mb-1">Mohamed Nowful</h4>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C9A227] font-semibold mb-4">
                Founder & CEO
              </p>
              
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 flex-grow text-balance">
                "Visionary founder behind D-AMN Aluminium Fabrication with 20+ years of hands-on experience in aluminium fabrication and interior solutions. Nowful leads the company with deep industry expertise, a passion for modern design, and an unwavering commitment to quality craftsmanship. From concept to completion, he ensures every project reflects durability, innovation, and timeless style."
              </p>

              {/* Social / Contact Links */}
              <div className="flex justify-center items-center gap-4 mt-auto pt-4 border-t border-white/5">
                <a
                  href="https://wa.me/94773724849"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:text-[#25D366] hover:bg-[#25D366]/10 hover:scale-110 transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                </a>
                <a
                  href="mailto:damn.aluminum@gmail.com"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:text-[#C9A227] hover:bg-[#C9A227]/10 hover:scale-110 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Managing Director Abdul Maajith */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="group flex flex-col bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 hover:-translate-y-2 hover:border-[#C9A227]/40 hover:shadow-[0_10px_30px_rgba(201,162,39,0.1)] transition-all duration-500"
          >
            {/* Photo Crop */}
            <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-[3px] border-[#C9A227] flex-shrink-0">
              <motion.img
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                src="/md.png"
                alt="Abdul Maajith - Managing Director"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content info */}
            <div className="text-center flex-grow flex flex-col">
              <h4 className="text-2xl font-bold text-white mb-1">Abdul Maajith</h4>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C9A227] font-semibold mb-4">
                Managing Director
              </p>
              
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 flex-grow text-balance">
                "Interior Engineering undergraduate and managing director at D-AMN. Abdul Maajith oversees day-to-day operations, project management, and client relations with hands-on expertise in aluminium fabrication and interior execution. He ensures every installation is delivered on time, within budget, and to the highest standards of finish."
              </p>

              {/* Social / Contact Links */}
              <div className="flex justify-center items-center gap-4 mt-auto pt-4 border-t border-white/5">
                <a
                  href="https://wa.me/94773724849"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:text-[#25D366] hover:bg-[#25D366]/10 hover:scale-110 transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                </a>
                <a
                  href="mailto:damn.aluminum@gmail.com"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:text-[#C9A227] hover:bg-[#C9A227]/10 hover:scale-110 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
