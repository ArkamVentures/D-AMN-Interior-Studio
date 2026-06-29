import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../data/gallery';
import { projects } from '../data/projects';
import { projectPhotos } from '../data/projectPhotos';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Lightbox } from '../components/ui/Lightbox';
import { ProjectGallery } from '../components/sections/ProjectGallery';
import { X, MapPin, Calendar, DollarSign, Star } from 'lucide-react';

const categories = ['all', 'luxury', 'kitchen', 'budget', 'wall', 'office'];

export const PortfolioPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const activeProject = projects.find(p => p.id === selectedProject);

  // Convert gallery images to ProjectPhoto format for the lightbox
  const lightboxImages = filteredImages.map((img) => ({
    id: img.id,
    src: img.src,
    location: '',
    service: img.category.charAt(0).toUpperCase() + img.category.slice(1),
    title: img.title,
  }));

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
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedImageIndex(index)}
                  className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid"
                >
                  <img src={image.src} alt={image.title} className="w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <span className="text-accent text-xs uppercase">{image.category}</span>
                    <h4 className="text-white font-semibold">{image.title}</h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Real Project Gallery */}
      <ProjectGallery />

      {/* Lightbox for gallery images */}
      <Lightbox
        images={lightboxImages}
        currentIndex={selectedImageIndex ?? 0}
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        onNavigate={setSelectedImageIndex}
      />

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
