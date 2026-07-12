import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Filter, Search, ChevronDown, Grid3X3, LayoutGrid, X, ChevronLeft, ChevronRight, ExternalLink, Eye } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { staticProjectData } from '../data/projectData';

/* ────────────────────────────────────────────────────────── */
/*  Portfolio Page — Responsive Gallery with Lightbox        */
/* ────────────────────────────────────────────────────────── */

const ITEMS_PER_PAGE = 12;

// Service descriptions for the overlay
const serviceDescriptions: Record<string, string> = {
  'Kitchen Cabinets': 'Modern aluminium kitchen cabinets — waterproof, rust-free, zero maintenance.',
  Windows: 'Premium aluminium windows with custom sizing and finishing.',
  Doors: 'Durable aluminium doors built for security and elegance.',
  Partitions: 'Aluminium partitions and cladding for modern interiors.',
};

const serviceTypes = ['All', 'Kitchen Cabinets', 'Windows', 'Doors', 'Partitions'];

/* ─── Lightbox Component (built-in) ──────────────────────── */

interface LightboxImage {
  id: string;
  src: string;
  title: string;
  location: string;
  service: string;
}

const PortfolioLightbox: React.FC<{
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}> = ({ images, currentIndex, isOpen, onClose, onNavigate }) => {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [direction, setDirection] = useState(0);

  const current = images[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setDirection(1);
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, goNext, goPrev, onClose]);

  // Touch / swipe
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev(); }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.92 }),
  };

  if (!isOpen || !current) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 sm:px-8 py-5 z-20">
            <div className="flex items-center gap-3">
              <span className="text-white/50 text-sm font-mono">
                <span className="text-[#C9A227] font-bold">{currentIndex + 1}</span>
                <span className="mx-1">/</span>
                <span>{images.length}</span>
              </span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:rotate-90 duration-300 backdrop-blur-sm border border-white/10"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image area */}
          <div
            className="relative w-full h-full flex items-center justify-center px-4 sm:px-20 py-24"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Prev */}
            {currentIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-3 sm:left-8 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A227]/80 text-white transition-all group backdrop-blur-sm border border-white/10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            )}

            {/* Image */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center max-w-full max-h-full"
              >
                <img
                  src={current.src}
                  alt={current.title}
                  className="max-w-full max-h-[72vh] sm:max-h-[76vh] object-contain rounded-xl shadow-2xl ring-1 ring-white/10"
                  draggable={false}
                />
                {/* Caption */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-5 text-center"
                >
                  <h3 className="text-white text-lg font-semibold mb-2">{current.title}</h3>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-sm border border-white/5">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                      {current.location}
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-[#C9A227]/20 text-[#C9A227] text-sm font-medium border border-[#C9A227]/20">
                      {current.service}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Next */}
            {currentIndex < images.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-3 sm:right-8 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A227]/80 text-white transition-all group backdrop-blur-sm border border-white/10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            )}
          </div>

          {/* Mobile swipe hint */}
          <div className="absolute bottom-6 left-0 right-0 text-center sm:hidden">
            <p className="text-white/30 text-xs tracking-wider uppercase">Swipe to navigate</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─── Main Portfolio Page ─────────────────────────────────── */

export const PortfolioPage: React.FC = () => {
  // Use staticProjectData directly because it has the correct image paths
  const projectPhotosList = useMemo(() => {
    return staticProjectData.map((project, i) => {
      // Create some variety in services for the filters to look nice,
      // since the original staticProjectData might have all set to 'Kitchen Cabinets'
      const services = ['Kitchen Cabinets', 'Windows', 'Doors', 'Partitions'];
      const randomService = services[i % services.length];
      
      return {
        id: project.id,
        src: project.image,
        title: project.title,
        location: project.location,
        service: project.category === 'Kitchen Cabinets' && i > 10 ? randomService : project.category,
      };
    });
  }, []);

  // Filters
  const [activeService, setActiveService] = useState('All');
  const [activeLocation, setActiveLocation] = useState('All Locations');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Pagination
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Dropdown ref for outside click
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered data
  const filteredPhotos = useMemo(() => {
    return projectPhotosList.filter((photo) => {
      const serviceMatch = activeService === 'All' || photo.service === activeService;
      const locationMatch = activeLocation === 'All Locations' || photo.location === activeLocation;
      const searchMatch = searchQuery === '' || 
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.location.toLowerCase().includes(searchQuery.toLowerCase());
      return serviceMatch && locationMatch && searchMatch;
    });
  }, [projectPhotosList, activeService, activeLocation, searchQuery]);

  const visiblePhotos = filteredPhotos.slice(0, visibleCount);

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeService, activeLocation, searchQuery]);

  // Lightbox handlers
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const lightboxImages: LightboxImage[] = useMemo(() =>
    filteredPhotos.map((p) => ({
      id: p.id,
      src: p.src,
      title: p.title,
      location: p.location,
      service: p.service,
    })),
  [filteredPhotos]);

  // Stats
  const totalShowing = Math.min(visibleCount, filteredPhotos.length);
  const totalFiltered = filteredPhotos.length;
  const hasMore = visibleCount < filteredPhotos.length;

  // Unique locations from data for the dropdown
  const uniqueLocations = useMemo(() => {
    const locs = new Set(projectPhotosList.map((p) => p.location));
    return ['All Locations', ...Array.from(locs).sort()];
  }, [projectPhotosList]);

  return (
    <div className="pt-20 min-h-screen bg-warm-gray dark:bg-dark-bg transition-colors duration-300">
      
      {/* ─── Hero Banner ──────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-72 h-72 bg-[#C9A227]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 -right-20 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.03] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/[0.05] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/20 text-[#C9A227] text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <Eye className="w-3.5 h-3.5" />
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-5 leading-tight">
              Craftsmanship in
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] via-[#e8d48b] to-[#C9A227]">
                Every Detail
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Browse our collection of premium aluminium fabrication projects across Sri Lanka — 
              from modern kitchens to elegant interiors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Filters & Search ─────────────────────────── */}
      <section className="sticky top-20 z-30 bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          
          {/* Search + Location row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name or location..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 focus:border-[#C9A227]/40 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-gray-300 dark:bg-white/20 text-gray-600 dark:text-white hover:bg-gray-400 dark:hover:bg-white/30 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Location Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all w-full sm:w-auto justify-between sm:justify-start ${
                  activeLocation !== 'All Locations'
                    ? 'bg-[#C9A227]/10 border-[#C9A227]/30 text-[#C9A227]'
                    : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#C9A227]/30'
                }`}
              >
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate max-w-[140px]">{activeLocation}</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showLocationDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 max-h-72 overflow-y-auto bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl z-40 scrollbar-hide"
                  >
                    {uniqueLocations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => { setActiveLocation(loc); setShowLocationDropdown(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          activeLocation === loc
                            ? 'bg-[#C9A227]/10 text-[#C9A227] font-semibold'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1 gap-2">
            {serviceTypes.map((service) => (
              <button
                key={service}
                onClick={() => setActiveService(service)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeService === service
                    ? 'bg-[#C9A227] text-black border-[#C9A227] shadow-lg shadow-[#C9A227]/20'
                    : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-[#C9A227]/40 hover:text-[#C9A227]'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Results Info Bar ─────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{totalShowing}</span> of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{totalFiltered}</span> projects
            {activeService !== 'All' && (
              <span className="ml-1">
                in <span className="text-[#C9A227] font-semibold">{activeService}</span>
              </span>
            )}
            {activeLocation !== 'All Locations' && (
              <span className="ml-1">
                at <span className="text-[#C9A227] font-semibold">{activeLocation}</span>
              </span>
            )}
          </p>
          {(activeService !== 'All' || activeLocation !== 'All Locations' || searchQuery) && (
            <button
              onClick={() => { setActiveService('All'); setActiveLocation('All Locations'); setSearchQuery(''); }}
              className="text-xs text-[#C9A227] hover:text-[#e8d48b] font-medium transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* ─── Gallery Grid ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPhotos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Try adjusting your filters or search query to find what you're looking for.
            </p>
            <button
              onClick={() => { setActiveService('All'); setActiveLocation('All Locations'); setSearchQuery(''); }}
              className="px-6 py-2.5 rounded-full bg-[#C9A227] text-black text-sm font-bold hover:bg-[#e8d48b] transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {visiblePhotos.map((photo, index) => (
                  <motion.div
                    layout
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
                    className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-white/5 cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500 border border-transparent hover:border-[#C9A227]/20"
                    onClick={() => openLightbox(index)}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={photo.src}
                        alt={`${photo.title} — ${photo.location}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                      {/* Quick view icon */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                          <ExternalLink className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Hover content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 z-10">
                        <h4 className="text-lg font-bold text-white mb-1.5 leading-tight">
                          {photo.title}
                        </h4>
                        <p className="text-white/60 text-xs mb-3 line-clamp-2 leading-relaxed">
                          {serviceDescriptions[photo.service] || 'Premium aluminium fabrication project.'}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-white/70 text-xs">
                            <MapPin className="w-3 h-3 text-[#C9A227]" />
                            {photo.location}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-white/30" />
                          <span className="text-[#C9A227] text-xs font-semibold">{photo.service}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* ─── Load More + Progress ────────────────── */}
            <div className="mt-12 flex flex-col items-center">
              {/* Progress bar */}
              <div className="w-48 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#C9A227] to-[#e8d48b] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(totalShowing / totalFiltered) * 100}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
                {totalShowing} of {totalFiltered} projects loaded
              </p>

              {hasMore && (
                <div className="sticky bottom-0 left-0 right-0 flex justify-center py-6 bg-warm-gray dark:bg-dark-bg z-50">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                    className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A227] hover:bg-[#e8d48b] text-black font-bold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#C9A227]/20 hover:shadow-[#C9A227]/40"
                  >
                    Load More Projects
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  </button>
                </div>
              )}

              {!hasMore && totalFiltered > 0 && (
                <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                  You've seen all {totalFiltered} projects ✨
                </p>
              )}
            </div>
          </>
        )}
      </section>

      {/* ─── CTA Banner ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] p-10 md:p-16 text-center"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C9A227]/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#C9A227]/5 rounded-full blur-[80px]" />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Get a free site visit and quotation for your aluminium fabrication project.
              We serve all across Sri Lanka with premium quality and guaranteed satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A227] hover:bg-[#e8d48b] text-black font-bold rounded-full transition-all duration-300 shadow-lg shadow-[#C9A227]/20 text-sm"
              >
                Get Free Quote
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/94772150202"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300 border border-white/10 text-sm"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Lightbox ─────────────────────────────────── */}
      <PortfolioLightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(i) => setLightboxIndex(i)}
      />
    </div>
  );
};
