import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ProjectGallery } from '../components/sections/ProjectGallery';
import { Lightbox } from '../components/ui/Lightbox';
import { useData } from '../context/DataContext';

const categories = ['all', 'luxury', 'kitchen', 'budget', 'wall', 'office'];

export const PortfolioPage: React.FC = () => {
  const { projectPhotosList } = useData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeProject, setSelectedProject] = useState<any | null>(null);

  const filteredImages = activeCategory === 'all'
    ? projectPhotosList
    : projectPhotosList.filter(img => img.service.toLowerCase() === activeCategory.toLowerCase());

  // Convert gallery images to ProjectPhoto format for the lightbox
  const lightboxImages = filteredImages.map((img) => ({
    id: img.id,
    src: img.src,
    location: img.location,
    service: img.service,
    title: img.title || 'Aluminium Fabrication Project',
  }));

  return (
    <div className="pt-20">
      <section className="py-24 bg-primary dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Fabrication Portfolio</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our best aluminium fabrication and custom industrial projects.
          </p>
        </div>
      </section>

      {/* Real Project Gallery */}
      <ProjectGallery />

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
