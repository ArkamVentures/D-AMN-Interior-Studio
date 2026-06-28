import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Ruler, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images Grid */}
          <div className="relative grid grid-cols-12 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-8 overflow-hidden rounded-2xl shadow-xl"
            >
              <img
                src="/gallery-1.png"
                alt="Aluminium door installation"
                className="w-full h-[320px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-4 self-end overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src="/gallery-2.png"
                alt="Modern kitchen cabinet"
                className="w-full h-[180px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="col-span-6 col-start-7 -mt-16 overflow-hidden rounded-2xl shadow-xl border-4 border-white dark:border-dark-bg transition-colors"
            >
              <img
                src="/gallery-3.png"
                alt="Tempered glass installation"
                className="w-full h-[220px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase block mb-3">About D-AMN</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary dark:text-white mb-6 leading-tight">
              Premium Aluminium & Glass Solutions for Modern Living.
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              D-AMN Aluminium Fabrication specializes in crafting premium aluminium doors, windows, kitchen cabinets, and tempered glass installations. Based in Dharga Town, we serve residential and commercial clients across Sri Lanka with customizable, durable, and stylish architectural solutions.
            </p>

            {/* Micro Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col">
                <ShieldCheck className="w-6 h-6 text-accent mb-2" />
                <h4 className="font-semibold text-sm text-primary dark:text-white mb-1">Premium Quality</h4>
                <p className="text-xs text-gray-500">Best materials for lasting durability.</p>
              </div>
              <div className="flex flex-col">
                <Ruler className="w-6 h-6 text-accent mb-2" />
                <h4 className="font-semibold text-sm text-primary dark:text-white mb-1">Expert Craft</h4>
                <p className="text-xs text-gray-500">Precision fabrication & installation.</p>
              </div>
              <div className="flex flex-col">
                <Award className="w-6 h-6 text-accent mb-2" />
                <h4 className="font-semibold text-sm text-primary dark:text-white mb-1">Best Price</h4>
                <p className="text-xs text-gray-500">Guaranteed best price on every project.</p>
              </div>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center text-accent font-semibold hover:underline group"
            >
              More About Our Company
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
