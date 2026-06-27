import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import { SectionHeading } from '../ui/SectionHeading';
import { MapPin, ArrowRight } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Curated Projects"
          subtitle="Featured Work"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer bg-warm-gray dark:bg-dark-card rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/5"
            >
              <Link to="/portfolio" className="block">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/25 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent text-primary text-xs font-semibold rounded-full uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-primary dark:text-white mb-2 group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-1 text-accent" />
                    {project.location}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-dark text-primary font-semibold rounded-lg shadow-lg shadow-accent/25 transition-colors group"
          >
            View Full Portfolio
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
