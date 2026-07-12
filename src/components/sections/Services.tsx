import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { LayoutGrid, Hammer, Box, Wind, Sparkles, Layers, Grid, Package, Droplet, CheckCircle2, PhoneCall } from 'lucide-react';

const coreServices = [
  {
    id: 'svc-1',
    title: 'Aluminium Doors & Windows',
    tagline: 'Built to last in every climate',
    features: ['Strong & Secure', 'Weatherproof Finish', 'Low Maintenance', 'Custom Sizing'],
    icon: Wind,
  },
  {
    id: 'svc-2',
    title: 'Custom Aluminium Fabrication',
    tagline: 'Precision for every project',
    features: ['Bespoke Profiles', 'Industrial Strength', 'High-Quality Welds', 'Fast Turnaround'],
    icon: Hammer,
  },
  {
    id: 'svc-3',
    title: 'Industrial Aluminium Structures',
    tagline: 'Engineered for demanding sites',
    features: ['Heavy Duty Frames', 'Corrosion Resistant', 'Structural Stability', 'Site Ready'],
    icon: Layers,
  },
  {
    id: 'svc-4',
    title: 'Aluminium Partitions & Cladding',
    tagline: 'Sleek finishes with industrial reliability',
    features: ['Clean Aesthetic', 'Durable Panels', 'Quick Installation', 'Weather Resistant'],
    icon: Grid,
  },
  {
    id: 'svc-5',
    title: 'Shopfronts & Facades',
    tagline: 'Make your business stand out',
    features: ['Signature Design', 'Durable Materials', 'Secure Systems', 'Premium Finishes'],
    icon: Box,
  },
  {
    id: 'svc-6',
    title: 'Gutter Systems & Drainage',
    tagline: 'Protect every roof edge',
    features: ['Robust Channels', 'Weatherproof Seal', 'Low Maintenance', 'Precision Fit'],
    icon: Droplet,
  },
  {
    id: 'svc-7',
    title: 'Aluminium Fixtures & Railings',
    tagline: 'Strong form for functional spaces',
    features: ['Custom Railings', 'Balcony Frames', 'Staircase Systems', 'Safety First'],
    icon: Package,
  },
  {
    id: 'svc-8',
    title: 'Glass & Aluminium Assemblies',
    tagline: 'Modern transparency with structural support',
    features: ['Tempered Glass', 'Framed Systems', 'Protective Coatings', 'Seamless Integration'],
    icon: Sparkles,
  },
  {
    id: 'svc-9',
    title: 'Commercial Fabrication Solutions',
    tagline: 'Reliable delivery for larger builds',
    features: ['Project Management', 'On-site Assembly', 'Quality Control', 'Industrial Compliance'],
    icon: LayoutGrid,
  }
];

import { useData } from '../../context/DataContext';

const iconMap: Record<string, any> = {
  Wind,
  Hammer,
  Layers,
  Grid,
  Box,
  Droplet,
  Package,
  Sparkles,
  LayoutGrid
};

interface ServicesProps {
  limit?: number;
}

export const Services: React.FC<ServicesProps> = ({ limit }) => {
  const { servicesList, contact } = useData();
  const displayedServices = limit ? servicesList.slice(0, limit) : servicesList;

  return (
    <section className="py-20 md:py-32 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!limit && (
          <SectionHeading
            title="Fabrication Solutions"
            subtitle="Industrial Aluminium Services"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedServices.map((service, index) => {
            const Icon = iconMap[service.iconName] || Wind;
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
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
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
            <p className="text-xs uppercase tracking-[0.2em] text-[#C9A227] font-semibold mb-4">Covered Areas</p>
              <p className="text-sm text-gray-500 leading-relaxed text-balance">
              #kaluthara #elpitiya #ambalangoda #aluthgama #mathugama #beruwela #uragasmanhandiya #karandeniya #horana #dodangoda #baduraliya #agalawatta #welipenna #bentota
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
