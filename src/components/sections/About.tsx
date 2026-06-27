import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Settings, Compass, LayoutGrid } from 'lucide-react';

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
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80"
                alt="Living space"
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
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80"
                alt="Decor detail"
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
                src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80"
                alt="Cabinetry detail"
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
              The New Standard of Modern Interior Artistry and Elite Design.
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              D-AMN Interior Studio is a premier interior design and aluminium fabrication company dedicated to transforming spaces into modern masterpieces. We specialize in delivering innovative interior solutions that blend creativity, functionality, and elegance.
            </p>

            {/* Micro Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col">
                <Compass className="w-6 h-6 text-accent mb-2" />
                <h4 className="font-semibold text-sm text-primary dark:text-white mb-1">Premium Quality</h4>
                <p className="text-xs text-gray-500">Premium materials sourced for high longevity.</p>
              </div>
              <div className="flex flex-col">
                <Settings className="w-6 h-6 text-accent mb-2" />
                <h4 className="font-semibold text-sm text-primary dark:text-white mb-1">Expert Craft</h4>
                <p className="text-xs text-gray-500">Skilled fabrication & design precision.</p>
              </div>
              <div className="flex flex-col">
                <LayoutGrid className="w-6 h-6 text-accent mb-2" />
                <h4 className="font-semibold text-sm text-primary dark:text-white mb-1">On-Time Delivery</h4>
                <p className="text-xs text-gray-500">Guaranteed execution timelines.</p>
              </div>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center text-accent font-semibold hover:underline group"
            >
              More About Our Firm
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
