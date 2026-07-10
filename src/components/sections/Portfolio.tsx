import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { useData } from '../../context/DataContext';
import { staticProjectData } from '../../data/projectData';

interface PortfolioProps {
  onSelectLocation?: (location: string) => void;
  activeLocation?: string;
}

const locationsData = [
  { name: 'Ambalangoda', services: ['Kitchen'], region: 'Southern' },
  { name: 'Benthota', services: ['Kitchen', 'Glass', 'Doors'], region: 'Southern' },
  { name: 'Kaluthara', services: ['Kitchen', 'Ceiling'], region: 'Western' },
  { name: 'Uragasmanhandiya', services: ['Kitchen'], region: 'Southern' },
  { name: 'Dehiwela', services: ['Kitchen'], region: 'Western' },
  { name: 'Horana', services: ['Kitchen', 'Partition'], region: 'Western' },
  { name: 'Dodangoda', services: ['Kitchen', 'Interior'], region: 'Western' },
  { name: 'Pahekanuwa', services: ['Kitchen', 'Interior'], region: 'Southern' },
  { name: 'Kelaniya', services: ['Kitchen', 'Interior'], region: 'Western' },
  { name: 'Kande Vihara', services: ['Kitchen', 'Interior'], region: 'Southern' },
  { name: 'Elpitiya', services: [], region: 'Southern' },
  { name: 'Aluthgama', services: [], region: 'Western' },
  { name: 'Mathugama', services: [], region: 'Western' },
  { name: 'Beruwela', services: [], region: 'Western' },
  { name: 'Karandeniya', services: [], region: 'Southern' },
  { name: 'Baduraliya', services: [], region: 'Western' },
  { name: 'Agalawatta', services: [], region: 'Western' },
  { name: 'Welipenna', services: [], region: 'Western' },
  { name: 'Bandarawala', services: [], region: 'Central' },
  { name: 'Polgahawela', services: [], region: 'North Western' },
  { name: 'Mariyam Gold, Beruwela', services: [], region: 'Western' },
  { name: 'Pelawatta', services: [], region: 'Western' }
];

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectLocation, activeLocation }) => {
  const { projectPhotosList } = useData();
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const handleLocationClick = (locName: string) => {
    if (onSelectLocation) {
      onSelectLocation(locName);
      // Wait slightly for state update, then scroll
      setTimeout(() => {
        const element = document.getElementById('our-projects');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-[#000000] text-white border-t border-b border-white/5 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A227]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <SectionHeading
            title="Our Projects Across Sri Lanka"
            subtitle="From Dharga Town to every corner of the island — quality you can see"
          />
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 mb-16 max-w-6xl mx-auto">
          {locationsData.map((loc, index) => {
            // Count actual photos for this location
            const locPhotos = staticProjectData.filter(p => p.location.toLowerCase() === loc.name.toLowerCase());
            const realCount = locPhotos.length;
            const hasProjects = realCount > 0;
            const isActive = activeLocation === loc.name;
            
            // Dynamically query a preview image from staticProjectData
            const previewPhoto = hasProjects 
              ? locPhotos[0].image 
              : null;

            return (
              <div key={loc.name} className="relative">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredLocation(loc.name)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  onClick={() => handleLocationClick(loc.name)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left ${
                    isActive
                      ? 'border-[#C9A227] bg-[#C9A227]/10 text-white shadow-[0_0_15px_rgba(201,162,39,0.2)]'
                      : 'border-white/5 bg-[#0f0f0f] text-gray-300 hover:border-[#C9A227]/50 hover:bg-[#141414] hover:text-white hover:shadow-[0_0_12px_rgba(201,162,39,0.1)] hover:-translate-y-1'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#C9A227]' : 'text-gray-500'}`} />
                    <span className="text-sm font-semibold truncate">{loc.name}</span>
                  </div>

                  {hasProjects ? (
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#C9A227] text-black text-xs font-bold shadow-md shadow-[#C9A227]/20">
                      {realCount}
                    </div>
                  ) : (
                    <span className="text-[9px] uppercase tracking-wider text-gray-600 font-medium">
                      Area
                    </span>
                  )}
                </motion.button>

                {/* Floating Preview Tooltip */}
                <AnimatePresence>
                  {hoveredLocation === loc.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 bg-[#121212] border border-[#C9A227]/30 rounded-2xl p-4 shadow-2xl z-50 pointer-events-none"
                    >
                      {previewPhoto ? (
                        <img
                          src={previewPhoto}
                          alt={`${loc.name} project preview`}
                          className="w-full h-48 object-cover rounded-xl mb-3"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-16 bg-[#1a1a1a] rounded-xl flex items-center justify-center mb-2.5 border border-white/5">
                          <MapPin className="w-6 h-6 text-gray-600" />
                        </div>
                      )}
                      
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Region</span>
                          <span className="text-[10px] text-white font-medium">{loc.region}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Services</span>
                          <span className="text-[10px] text-[#C9A227] font-semibold truncate max-w-[120px]">
                            {loc.services.length > 0 ? loc.services.join(', ') : 'All Services'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mb-16">
          <button
            onClick={() => handleLocationClick('All Locations')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A227] hover:bg-white text-black hover:text-black font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(201,162,39,0.2)] group"
          >
            View All {staticProjectData.length}+ Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Service Area Hashtags */}
        <div className="max-w-3xl mx-auto text-center border-t border-white/5 pt-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C9A227] font-bold mb-4">Coverage Areas</p>
            <p className="text-xs text-[#C9A227]/60 leading-relaxed max-w-2xl mx-auto">
              #kaluthara #elpitiya #ambalangoda #aluthgama #mathugama #beruwela #uragasmanhandiya #karandeniya #horana #dodangoda #baduraliya #agalawatta #welipenna #bentota
            </p>
        </div>

      </div>
    </section>
  );
};
