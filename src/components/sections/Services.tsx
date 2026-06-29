import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { LayoutGrid, Hammer, Box, Wind, Sparkles, Layers, Grid, Package, Droplet, CheckCircle2, PhoneCall } from 'lucide-react';

const coreServices = [
  {
    id: 'svc-1',
    title: 'Aluminium Doors & Windows',
    tagline: 'Open up with style',
    features: ['Strong & Stylish', 'Fully Recyclable', 'Customizable', 'Weather Resistant'],
    icon: Wind,
  },
  {
    id: 'svc-2',
    title: 'Modern Kitchen Cabinets',
    tagline: 'Make your dream kitchen',
    features: ['Soft-close Door', 'Modern Design', 'Hygienic & Safe', 'Waterproof Body'],
    icon: Box,
  },
  {
    id: 'svc-3',
    title: 'Tempered Glass Works',
    tagline: 'Strength meets elegance',
    features: ['10mm & 12mm Glass', 'Strong & Safe', 'Rust Free', 'Crystal Clear Finish'],
    icon: Sparkles,
  },
  {
    id: 'svc-4',
    title: 'Aluminium Partition',
    tagline: 'Shape your dream space',
    features: ['Strong & Stylish', 'Fully Recyclable', 'Lightweight', 'Fire-resistant'],
    icon: Grid,
  },
  {
    id: 'svc-5',
    title: 'ACP Cladding Interior & Exterior',
    tagline: 'Transform walls into modern elegance',
    features: ['Lightweight yet Strong', 'Weather & UV Resistant', 'Modern Sleek Look', 'Long-lasting Color'],
    icon: Package,
  },
  {
    id: 'svc-6',
    title: 'Gypsum & I-Panel Ceiling',
    tagline: 'Elegant style and lasting strength',
    features: ['Sleek Finish', 'Modern Look', 'Easy to Maintain', 'Sound Insulation'],
    icon: Layers,
  },
  {
    id: 'svc-7',
    title: 'Gutter Works',
    tagline: 'Make your roof design complete',
    features: ['Strong Gutter', '10 Years Warranty', 'Skilled Group', 'Korean Union Steel 0.47'],
    icon: Droplet,
  },
  {
    id: 'svc-8',
    title: 'Modern Shop Fittings & Interiors',
    tagline: 'Transform your office or store into a modern masterpiece',
    features: ['Elegant Lights', 'Tech-integrated', 'Custom Design', 'Install & Finishing'],
    icon: LayoutGrid,
  },
  {
    id: 'svc-9',
    title: 'Fluted Wall Panel Decoration',
    tagline: 'Redefine your walls with texture',
    features: ['Elegant Lights', 'Tech-integrated', 'Custom Design', 'Install & Finishing'],
    icon: Hammer,
  }
];

interface ServicesProps {
  limit?: number;
}

export const Services: React.FC<ServicesProps> = ({ limit }) => {
  const displayedServices = limit ? coreServices.slice(0, limit) : coreServices;

  return (
    <section className="py-20 md:py-32 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!limit && (
          <SectionHeading
            title="Our Expertise"
            subtitle="What We Deliver"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative flex flex-col bg-[#050505] border border-white/5 rounded-3xl p-8 shadow-2xl hover:-translate-y-1 hover:border-[#C9A227]/50 transition-all duration-300 h-full"
              >
                {/* Header: Icon + Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 text-white group-hover:bg-[#C9A227] group-hover:text-black group-hover:scale-110 transition-all duration-300 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white leading-tight">{service.title}</h3>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-[#C9A227] text-sm font-semibold tracking-wide uppercase mb-6 flex-grow">
                  "{service.tagline}"
                </p>
                
                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-white mt-0.5 shrink-0" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Book Now Button */}
                <div className="mt-auto pt-6 border-t border-white/5">
                  <a
                    href="tel:+94773724849"
                    className="flex items-center justify-center w-full px-6 py-3.5 border-2 border-[#C9A227] text-white font-bold rounded-xl hover:bg-[#C9A227] hover:text-black hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all duration-300 group/btn"
                  >
                    BOOK NOW
                    <PhoneCall className="w-4 h-4 ml-2 group-hover/btn:animate-pulse" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Services Button (Shows only if limited on Home Page) */}
        {limit && (
          <div className="text-center mb-16">
            <a
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:border-[#C9A227] hover:text-[#C9A227] hover:bg-[#C9A227]/10 transition-all duration-300"
            >
              View All Services
            </a>
          </div>
        )}

        {/* Service Area Hashtags (Only show on full services page to save space on home) */}
        {!limit && (
          <div className="max-w-4xl mx-auto text-center border-t border-white/10 pt-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C9A227] font-semibold mb-4">Service Areas</p>
            <p className="text-sm text-gray-500 leading-relaxed text-balance">
              #kaluthara #elpitiya #ambalangoda #aluthgama #mathugama #beruwela #uragasmanhandiya #karandeniya #horana #dodangoda #baduraliya #agalawatta #welipenna #bentota
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
