import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { pricingPackages } from '../../data/pricing';
import { SectionHeading } from '../ui/SectionHeading';
import { Check, Star, ArrowRight } from 'lucide-react';

export const Pricing: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-warm-gray dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Investment Options"
          subtitle="Packages"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 flex flex-col justify-between ${
                pkg.highlighted 
                  ? 'bg-primary border-2 border-accent shadow-xl scale-105 z-10 text-white' 
                  : 'bg-white dark:bg-dark-card border border-gray-100 dark:border-white/5'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-accent text-primary text-xs font-semibold rounded-full flex items-center shadow-lg shadow-accent/25">
                    <Star className="w-3 h-3 mr-1 fill-primary" />Most Popular
                  </span>
                </div>
              )}
              
              <div>
                <div className="text-center mb-8">
                  <h3 className={`text-xl font-semibold mb-2 ${pkg.highlighted ? 'text-white' : 'text-primary dark:text-white'}`}>
                    {pkg.name}
                  </h3>
                  <div className="text-3xl font-serif font-bold text-accent mb-2">
                    {pkg.price}
                  </div>
                  <p className={`text-sm ${pkg.highlighted ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    {pkg.description}
                  </p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className={`text-sm ${pkg.highlighted ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link 
                to="/contact" 
                className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                  pkg.highlighted 
                    ? 'bg-accent text-primary hover:bg-accent-dark' 
                    : 'bg-primary dark:bg-white text-white dark:text-primary hover:bg-primary/90'
                }`}
              >
                Get Started 
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
