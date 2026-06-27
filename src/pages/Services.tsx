import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/services';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, ChefHat, Gem, PiggyBank, Sofa, Bed, LayoutGrid, Archive, Briefcase, Map, Hammer, Armchair, Box } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  ChefHat, Gem, PiggyBank, Sofa, Bed, LayoutGrid, Archive, Briefcase, Map, Hammer, Armchair, Box
};

export const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const activeService = services.find(s => s.id === selectedService);

  return (
    <div className="pt-20">
      <section className="py-24 bg-primary dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive interior solutions tailored to your needs
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Box;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedService(service.id)}
                  className="group cursor-pointer bg-warm-gray dark:bg-dark-card rounded-2xl overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="relative h-48">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-primary dark:text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{service.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-dark-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-64">
                <img src={activeService.image} alt={activeService.title} className="w-full h-full object-cover" />
                <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-serif font-bold text-white">{activeService.title}</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-600 dark:text-gray-400 mb-8">{activeService.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold text-primary dark:text-white mb-4">Benefits</h4>
                    <ul className="space-y-2">
                      {activeService.benefits.map((b, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                          <Check className="w-4 h-4 text-accent mr-2 flex-shrink-0" />{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary dark:text-white mb-4">Process</h4>
                    <ul className="space-y-2">
                      {activeService.process.map((p, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                          <span className="w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0">{i+1}</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark">
                  Get a Quote <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
