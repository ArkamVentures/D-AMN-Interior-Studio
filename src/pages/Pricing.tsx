import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Check, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export const PricingPage: React.FC = () => {
  const { pricingList } = useData();

  return (
    <div className="pt-20">
      <section className="py-24 bg-primary dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Investment Plans</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transparent pricing for every budget and vision
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingList.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${pkg.highlighted ? 'bg-[#0f0f0f] border-2 border-[#C9A227] shadow-xl scale-105 z-10' : 'bg-warm-gray dark:bg-dark-card border border-gray-100 dark:border-white/5'}`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 bg-[#C9A227] text-black text-xs font-bold rounded-full flex items-center">
                      <Star className="w-3 h-3 mr-1 fill-black text-black" />Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className={`text-xl font-semibold mb-2 ${pkg.highlighted ? 'text-white' : 'text-primary dark:text-white'}`}>{pkg.name}</h3>
                  <div className="text-3xl font-serif font-bold text-[#C9A227] mb-2">{pkg.price}</div>
                  <p className={`text-sm ${pkg.highlighted ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>{pkg.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-[#C9A227] flex-shrink-0" />
                      <span className={`text-sm ${pkg.highlighted ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all ${pkg.highlighted ? 'bg-[#C9A227] text-black font-bold hover:shadow-lg' : 'bg-primary dark:bg-white text-white dark:text-primary hover:bg-primary/90'}`}>
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
