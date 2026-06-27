import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '../../data/services';
import { SectionHeading } from '../ui/SectionHeading';
import { DoorOpen, ChefHat, GlassWater, Box, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  DoorOpen, ChefHat, GlassWater, Box
};

export const Services: React.FC = () => {
  // Show all 3 services on home page
  const homeServices = services.slice(0, 3);

  return (
    <section className="py-20 md:py-32 bg-warm-gray dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What We Deliver"
          subtitle="Our Expertise"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {homeServices.map((service, index) => {
            const Icon = iconMap[service.icon] || Box;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white dark:bg-dark-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-white/5"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-primary dark:text-white mb-3 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-accent text-sm font-semibold hover:underline"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center px-8 py-4 bg-primary dark:bg-white text-white dark:text-primary font-semibold rounded-lg hover:bg-primary/95 dark:hover:bg-white/90 transition-colors shadow-md"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};
