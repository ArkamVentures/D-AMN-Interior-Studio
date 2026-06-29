import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectPhotos, locations, serviceTypes } from '../../data/projectPhotos';
import { SectionHeading } from '../ui/SectionHeading';
import { Lightbox } from '../ui/Lightbox';
import { MapPin, Filter, Phone, ChevronDown, ArrowRight } from 'lucide-react';

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 12;

interface ProjectGalleryProps {
  activeLocation?: string;
  setActiveLocation?: (loc: string) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  activeLocation: propActiveLocation,
  setActiveLocation: propSetActiveLocation,
}) => {
  const [internalLocation, setInternalLocation] = useState('All Locations');
  const activeLocation = propActiveLocation !== undefined ? propActiveLocation : internalLocation;
  const setActiveLocation = propSetActiveLocation !== undefined ? propSetActiveLocation : setInternalLocation;
  const [activeService, setActiveService] = useState('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Filter logic
  const filteredPhotos = useMemo(() => {
    return projectPhotos.filter((photo) => {
      const locationMatch =
        activeLocation === 'All Locations' || photo.location === activeLocation;
      const serviceMatch =
        activeService === 'All' || photo.service === activeService;
      return locationMatch && serviceMatch;
    });
  }, [activeLocation, activeService]);

  const visiblePhotos = filteredPhotos.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPhotos.length;

  // Reset visible count on filter change
  const handleFilterChange = (type: 'location' | 'service', value: string) => {
    setVisibleCount(INITIAL_COUNT);
    if (type === 'location') {
      setActiveLocation(value);
      setShowLocationDropdown(false);
    } else {
      setActiveService(value);
    }
  };

  const openLightbox = (index: number) => {
    // Find the actual index in filteredPhotos
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Get unique location counts
  const locationCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    projectPhotos.forEach((p) => {
      counts[p.location] = (counts[p.location] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <section
      id="our-projects"
      className="py-20 md:py-32 bg-warm-gray dark:bg-dark-bg transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Projects"
          subtitle="Real Work, Real Results"
        />

        <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 -mt-6">
          Browse through our completed projects across Sri Lanka. Each project
          showcases our commitment to quality aluminium fabrication and modern
          design.
        </p>

        {/* ─── Filter Bar ─────────────────────────────────────── */}
        <div className="mb-10 space-y-4">
          {/* Service Type Filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {serviceTypes.map((service) => (
              <button
                key={service}
                onClick={() => handleFilterChange('service', service)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 ${
                  activeService === service
                    ? 'bg-accent text-primary shadow-lg shadow-accent/25 scale-105'
                    : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-accent/10 hover:text-accent border border-gray-200 dark:border-white/10'
                }`}
              >
                {service}
              </button>
            ))}
          </div>

          {/* Location Filter */}
          <div className="flex justify-center">
            <div className="relative">
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
                  activeLocation !== 'All Locations'
                    ? 'bg-accent/10 text-accent border-accent/30'
                    : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-accent/30'
                }`}
              >
                <MapPin className="w-4 h-4" />
                {activeLocation}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showLocationDropdown ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Location Dropdown */}
              <AnimatePresence>
                {showLocationDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 max-h-72 overflow-y-auto bg-white dark:bg-dark-card rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 z-30"
                  >
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleFilterChange('location', loc)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                          activeLocation === loc
                            ? 'bg-accent/10 text-accent font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                        }`}
                      >
                        <span>{loc}</span>
                        {loc !== 'All Locations' && locationCounts[loc] && (
                          <span className="text-xs text-gray-400 bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-full">
                            {locationCounts[loc]}
                          </span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Active filter info */}
          <div className="text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Showing{' '}
              <span className="text-accent font-semibold">
                {Math.min(visibleCount, filteredPhotos.length)}
              </span>{' '}
              of{' '}
              <span className="text-accent font-semibold">
                {filteredPhotos.length}
              </span>{' '}
              projects
            </p>
          </div>
        </div>

        {/* ─── Masonry Grid ───────────────────────────────────── */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {visiblePhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
                onClick={() => openLightbox(index)}
                className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid shadow-lg hover:shadow-[0_0_25px_rgba(201,162,39,0.3)] transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-[#C9A227]/30"
              >
                {/* Image with lazy loading */}
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out"
                />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Service tag (top-right) */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-4px] group-hover:translate-y-0">
                  <span className="px-2.5 py-1 rounded-full bg-accent/90 text-primary text-[10px] sm:text-xs font-semibold uppercase tracking-wider shadow-lg">
                    {photo.service}
                  </span>
                </div>

                {/* Location badge (bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span className="text-white text-xs sm:text-sm font-medium truncate">
                      {photo.location}
                    </span>
                  </div>
                  <p className="text-white/60 text-[10px] sm:text-xs mt-0.5 truncate">
                    {photo.title}
                  </p>
                </div>

                {/* Always-visible location badge (subtle) */}
                <div className="absolute bottom-2 left-2 group-hover:opacity-0 transition-opacity duration-200">
                  <span className="px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white/80 text-[10px] font-medium">
                    {photo.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20">
            <Filter className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 dark:text-gray-500 text-lg">
              No projects found for the selected filters.
            </p>
            <button
              onClick={() => {
                setActiveLocation('All Locations');
                setActiveService('All');
              }}
              className="mt-4 text-accent hover:text-accent-dark underline text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* View More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-dark-card text-primary dark:text-white font-semibold rounded-full border border-gray-200 dark:border-white/10 hover:border-accent hover:text-accent transition-all shadow-sm hover:shadow-md group"
            >
              View More Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-gray-400 mt-2">
              {filteredPhotos.length - visibleCount} more projects to explore
            </p>
          </div>
        )}

        {/* ─── CTA Section ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="relative overflow-hidden bg-primary dark:bg-dark-card rounded-2xl p-8 sm:p-12 shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                Start Your Project Today
              </h3>
              <p className="text-gray-400 max-w-lg mx-auto mb-8">
                Ready to transform your space? Contact us for a free
                consultation and quotation. We serve all areas across Sri Lanka.
              </p>
              <a
                href="tel:+94773724849"
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent-dark text-primary font-bold rounded-full shadow-lg shadow-accent/30 transition-all hover:shadow-xl hover:shadow-accent/40 hover:scale-105 active:scale-95 group"
              >
                <Phone className="w-5 h-5 group-hover:animate-pulse" />
                Call +94 77 372 4849
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={filteredPhotos}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
};
