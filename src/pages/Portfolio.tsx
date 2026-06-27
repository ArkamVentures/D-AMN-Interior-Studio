import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../data/gallery';
import { projects } from '../data/projects';
import { SectionHeading } from '../components/ui/SectionHeading';
import { X, MapPin, Calendar, DollarSign, Star } from 'lucide-react';

const categories = ['all', 'luxury', 'kitchen', 'budget', 'wall', 'office'];

export const PortfolioPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const activeProject = projects.find(p => p.id === selectedProject);

  return (
    <div className="pt-20">
      <section className="py-24 bg-primary dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Portfolio</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our curated collection of transformative interior designs
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Gallery" subtitle="Our Work" />

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat ? 'bg-accent text-white' : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedImage(image.src)}
                  className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid"
                >
                  <img src={image.src} alt={image.title} className="w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <span className="text-accent text-xs uppercase">{image.category}</span>
                    <h4 className="text-white font-semibold">{image.title}</h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Featured Projects */}
          <div className="mt-24">
            <SectionHeading title="Featured Projects" subtitle="Case Studies" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(p => p.featured).map(project => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedProject(project.id)}
                  className="group bg-warm-gray dark:bg-dark-card rounded-2xl overflow-hidden cursor-pointer"
                >
                  <div className="relative h-56">
                    <img src={project.images[0]} alt={project.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-accent text-white text-xs rounded-full">{project.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-primary dark:text-white mb-2">{project.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                      <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{project.location}</span>
                      <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1" />{project.budget}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-4 right-4 text-white"><X className="w-8 h-8" /></button>
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={selectedImage} alt="" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-dark-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-72">
                <img src={activeProject.images[0]} alt={activeProject.name} className="w-full h-full object-cover" />
                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-primary dark:text-white mb-4">{activeProject.name}</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-warm-gray dark:bg-dark-bg rounded-lg">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-primary dark:text-white">{activeProject.location}</p>
                  </div>
                  <div className="p-4 bg-warm-gray dark:bg-dark-bg rounded-lg">
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="text-sm font-medium text-primary dark:text-white">{activeProject.budget}</p>
                  </div>
                  <div className="p-4 bg-warm-gray dark:bg-dark-bg rounded-lg">
                    <p className="text-xs text-gray-500">Completed</p>
                    <p className="text-sm font-medium text-primary dark:text-white">{activeProject.completionDate}</p>
                  </div>
                </div>
                <div className="bg-warm-gray dark:bg-dark-bg rounded-xl p-6">
                  <div className="flex items-center mb-3"><Star className="w-5 h-5 text-accent fill-accent" /><span className="ml-2 text-sm font-medium">Client Testimonial</span></div>
                  <p className="text-gray-600 dark:text-gray-400 italic">"{activeProject.testimonial}"</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
