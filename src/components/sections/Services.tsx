import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../ui/SectionHeading';
import { LayoutGrid, Hammer, Box, Wind, Sparkles, Layers, Grid, Package, Droplet, CheckCircle2, PhoneCall, MapPin } from 'lucide-react';

const coreServices = [
  {
    id: 'svc-1',
    title: 'Modern Kitchen Cabinets & Pantry Cupboards',
    description: 'Sleek aluminium kitchen solutions with wood-finish, soft-close doors, waterproof & rust-proof bodies',
    locations: 'Dehiwela, Kelaniya, Benthota, Uragasmanhandiya, Kande Vihara, Horana, Ambalangoda, Dodangoda, Kaluthara, Pahekanuwa',
    icon: Box,
  },
  {
    id: 'svc-2',
    title: 'Aluminium Doors & Windows',
    description: 'Custom-designed durable frames — sliding, folding, casement styles for homes & commercial spaces',
    locations: 'Benthota, Horana, Kaluthara',
    icon: Wind,
  },
  {
    id: 'svc-3',
    title: 'Tempered Glass Works',
    description: '10mm & 12mm tempered glass — balcony railings, staircase railings, shower cubicles, glass partitions',
    locations: 'Benthota',
    icon: Sparkles,
  },
  {
    id: 'svc-4',
    title: 'Gypsum & I-Panel Ceiling',
    description: 'Professional ceiling installations with clean finish and modern elegance',
    locations: 'Kaluthara',
    icon: Layers,
  },
  {
    id: 'svc-5',
    title: 'Aluminium Partitions',
    description: 'Sleek office and home partitions for modern space division',
    locations: 'Horana',
    icon: Grid,
  },
  {
    id: 'svc-6',
    title: 'Aluminium Cladding',
    description: 'Protective & decorative exterior/interior wall cladding',
    locations: '',
    icon: Package,
  },
  {
    id: 'svc-7',
    title: 'Gutter Works',
    description: 'Durable, weather-resistant aluminium gutter systems',
    locations: '',
    icon: Droplet,
  },
  {
    id: 'svc-8',
    title: 'Interior Design Studio',
    description: 'Complete interior solutions — design to execution',
    locations: 'All locations',
    icon: LayoutGrid,
  }
];

const reasons = [
  'Premium Materials — High-grade aluminium & tempered glass',
  'Custom Designs — Tailored to your space & style',
  'Expert Installation — Clean finish, precise fitting',
  'Zero Maintenance — Rust-proof, waterproof, termite-free',
  'Free Site Visit & Quotation — Best price guaranteed',
];

export const Services: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Expertise"
          subtitle="What We Deliver"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {coreServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative flex flex-col bg-slate-900/90 border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20 hover:-translate-y-1 hover:border-amber-400/40 transition-all duration-300 h-full"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 text-amber-300 mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 leading-tight">{service.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow">{service.description}</p>
                
                {service.locations && (
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <div className="flex items-start gap-1.5 text-xs text-amber-300/80">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <span className="leading-snug">{service.locations}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 mb-12">
          <h3 className="text-2xl font-semibold text-white mb-6">Why Choose Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {reasons.map((reason) => (
              <div key={reason} className="flex items-start gap-3 rounded-2xl bg-slate-950/80 border border-white/5 p-4">
                <span className="mt-1 text-amber-300"><CheckCircle2 className="w-5 h-5" /></span>
                <p className="text-sm text-slate-300 leading-snug">{reason}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-16">
          <a
            href="tel:+94773724849"
            className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-slate-950 font-semibold rounded-full shadow-2xl shadow-amber-500/20 hover:bg-amber-400 hover:scale-105 transition-all duration-300"
          >
            <PhoneCall className="w-5 h-5 mr-3 animate-pulse" />
            Get Free Quotation — Call +94 77 372 4849
          </a>
        </div>

        {/* Service Area Hashtags */}
        <div className="max-w-4xl mx-auto text-center border-t border-white/10 pt-8">
          <p className="text-xs uppercase tracking-widest text-amber-500/80 font-semibold mb-4">Service Areas</p>
          <p className="text-sm text-slate-500 leading-relaxed text-balance">
            #kaluthara #elpitiya #ambalangoda #aluthgama #mathugama #beruwela #uragasmanhandiya #karandeniya #horana #dodangoda #baduraliya #agalawatta #welipenna #bentota
          </p>
        </div>
      </div>
    </section>
  );
};
