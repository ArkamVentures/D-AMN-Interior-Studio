import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { staticProjectData } from '../../data/projectData';

const CATEGORIES = ["All", "Kitchen Cabinets", "Windows", "Doors", "Partitions", "Facades", "Railings"];
const LOCATIONS = ["All Sri Lanka", "Ambalangoda", "Benthota", "Kaluthara", "Uragasmanhandiya", "Dehiwela", "Horana", "Dodangoda", "Pahekanuwa", "Kelaniya", "Elpitiya", "Mathugama", "Karandeniya", "Bandarawala", "Polgahawela", "Pelawatta"];
const INITIAL_COUNT = 6;
const TOTAL_REAL_PROJECTS = 94;

export interface ProjectGalleryProps {
  activeLocation?: string;
  setActiveLocation?: (loc: string) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  activeLocation: propActiveLocation,
  setActiveLocation: propSetActiveLocation,
}) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [internalLocation, setInternalLocation] = useState("All Sri Lanka");
  
  const activeLocation = propActiveLocation !== undefined ? propActiveLocation : internalLocation;
  const setActiveLocation = propSetActiveLocation !== undefined ? propSetActiveLocation : setInternalLocation;

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Filter the static array
  const filteredProjects = useMemo(() => {
    let filtered = staticProjectData.filter((project) => {
      const categoryMatch = activeCategory === "All" || project.category === activeCategory;
      const locationMatch = activeLocation === "All Sri Lanka" || project.city === activeLocation;
      return categoryMatch && locationMatch;
    });
    
    if (activeLocation === "All Sri Lanka") {
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    }
    
    return filtered;
  }, [activeCategory, activeLocation]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  // Reset count when filters change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_COUNT);
  };

  const handleLocationChange = (location: string) => {
    setActiveLocation(location);
    setVisibleCount(INITIAL_COUNT);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  // Find featured project if any (we'll just use the first one marked featured)
  const featuredProject = useMemo(() => staticProjectData.find(p => p.featured), []);

  return (
    <section id="our-projects" className="py-20 md:py-32 bg-warm-gray dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          title="Our Projects"
          subtitle="OUR PROJECTS ACROSS SRI LANKA"
        />

        <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 -mt-6">
          Browse through our completed projects across Sri Lanka. Each project showcases our commitment to quality aluminium fabrication and modern design.
        </p>

        {/* Featured Hero (Optional, shown only if 'All' is selected and there is a featured project) */}
        {activeCategory === "All" && activeLocation === "All Sri Lanka" && featuredProject && (
          <div className="mb-16 relative overflow-hidden rounded-3xl shadow-2xl group cursor-pointer h-[400px] md:h-[500px]">
<img 
              src={featuredProject.image} 
              alt={`${featuredProject.title} in ${featuredProject.location}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              <div>
                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider text-primary bg-accent rounded-full">
                  Featured Project
                </span>
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
                  {featuredProject.title}
                </h3>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-lg">{featuredProject.location}</span>
                </div>
              </div>
              <button className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-primary hover:bg-accent hover:text-white transition-colors rounded-full font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-warm-gray dark:focus-visible:ring-offset-dark-bg">
                View Project <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Filter Chips */}
        <div className="mb-12 space-y-6">
          {/* Categories */}
          <div className="flex overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center gap-3">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-warm-gray dark:focus-visible:ring-offset-dark-bg ${
                  activeCategory === category 
                    ? 'bg-accent text-primary shadow-lg shadow-accent/20' 
                    : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-200 dark:border-white/10'
                }`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div layoutId="activeCategoryDot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </button>
            ))}
          </div>

          {/* Locations */}
          <div className="flex overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center gap-3">
            {LOCATIONS.map(location => (
              <button
                key={location}
                onClick={() => handleLocationChange(location)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-warm-gray dark:focus-visible:ring-offset-dark-bg ${
                  activeLocation === location 
                    ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-900' 
                    : 'bg-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="relative overflow-hidden rounded-2xl cursor-pointer group break-inside-avoid shadow-md hover:shadow-xl transition-shadow border border-transparent hover:border-accent/30"
              >
<img 
                  src={project.image} 
                  alt={`${project.title} in ${project.location}`}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Dark overlay slides up */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category tag always visible on top right in dark mode, or only on hover */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest rounded-full border border-white/10">
                    {project.category}
                  </span>
                </div>

                {/* Content slides up */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <h4 className="text-xl font-bold text-white mb-2 leading-tight">
                    {project.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-white/70 mb-4 text-sm">
                    <MapPin className="w-4 h-4 text-accent" />
                    {project.location}
                  </div>
                  <button 
                    className="flex items-center gap-2 text-accent font-semibold text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg"
                    aria-label={`View ${project.title} project`}
                  >
                    View Project <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <p className="text-lg">No projects match the selected filters.</p>
            <button 
              onClick={() => { setActiveCategory("All"); setActiveLocation("All Sri Lanka"); }}
              className="mt-4 text-accent hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-warm-gray dark:focus-visible:ring-offset-dark-bg rounded"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Load More & Progress */}
        {filteredProjects.length > 0 && (
          <div className="mt-16 flex flex-col items-center">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              Showing {visibleCount} of {filteredProjects.length === staticProjectData.length ? TOTAL_REAL_PROJECTS : filteredProjects.length} projects
            </p>
            
            <div className="w-64 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mb-8">
              <motion.div 
                className="h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${(visibleCount / (filteredProjects.length === staticProjectData.length ? TOTAL_REAL_PROJECTS : filteredProjects.length)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

{visibleCount < filteredProjects.length ? (
              <div className="mt-8 flex flex-col items-center gap-4">
                <button
                  onClick={loadMore}
                  className="px-8 py-3 bg-primary text-black font-semibold rounded-full hover:bg-accent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-warm-gray dark:focus-visible:ring-offset-dark-bg"
                >
                  Load More Projects
                </button>
                <a href="/portfolio" className="text-gray-400 hover:text-primary transition text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-warm-gray dark:focus-visible:ring-offset-dark-bg rounded">
                  View complete portfolio →
                </a>
              </div>
            ) : (
              filteredProjects.length === staticProjectData.length && (
                <div className="mt-8 flex flex-col items-center gap-4">
                  <button
                    className="px-8 py-3 bg-primary text-black font-semibold rounded-full hover:bg-accent transition opacity-50 cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-warm-gray dark:focus-visible:ring-offset-dark-bg"
                    title="Mockup limit reached"
                  >
                    {TOTAL_REAL_PROJECTS - visibleCount} more projects
                  </button>
                  <a href="/portfolio" className="text-gray-400 hover:text-primary transition text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-warm-gray dark:focus-visible:ring-offset-dark-bg rounded">
                    View complete portfolio →
                  </a>
                </div>
              )
            )}
          </div>
        )}

      </div>
    </section>
  );
};
