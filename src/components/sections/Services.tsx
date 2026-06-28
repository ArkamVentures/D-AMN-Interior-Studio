import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../ui/SectionHeading';
import { LayoutGrid, Hammer, Box, Wind, Sparkles, Layers, Grid, Package, Droplet, CheckCircle2, PhoneCall } from 'lucide-react';

const services = [
  {
    id: 'svc-1',
    title: 'Interior Design Studio',
    description: 'Complete interior solutions blending functionality with modern aesthetics',
    icon: LayoutGrid,
  },
  {
    id: 'svc-2',
    title: 'All Aluminum Works',
    description: 'Custom fabrication of premium aluminium structures for residential & commercial spaces',
    icon: Hammer,
  },
  {
    id: 'svc-3',
    title: 'Pantry Cupboards',
    description: 'Sleek, wood-finish aluminium cabinets — rust-proof, waterproof & built to last',
    icon: Box,
  },
  {
    id: 'svc-4',
    title: 'Doors & Windows',
    description: 'Durable, stylish aluminium frames with smooth operation and weather resistance',
    icon: Wind,
  },
  {
    id: 'svc-5',
    title: 'Glass Works',
    description: '10mm & 12mm tempered glass — railings, partitions, shower cubicles & more',
    icon: Sparkles,
  },
  {
    id: 'svc-6',
    title: 'Gypsum & I-Panel Ceiling',
    description: 'Professional ceiling installations with clean finish and modern elegance',
    icon: Layers,
  },
  {
    id: 'svc-7',
    title: 'Partition',
    description: 'Sleek aluminium partitions for offices, homes & commercial spaces',
    icon: Grid,
  },
  {
    id: 'svc-8',
    title: 'Cladding Works',
    description: 'Protective & decorative aluminium cladding for exterior & interior surfaces',
    icon: Package,
  },
  {
    id: 'svc-9',
    title: 'Gutter Works',
    description: 'Durable, weather-resistant aluminium gutter systems',
    icon: Droplet,
  },
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
          title="D-AMN Aluminium Fabrication website"
          subtitle=""
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group bg-slate-900/90 border border-white/10 rounded-3xl p-8 shadow-xl shadow-black/20 hover:-translate-y-1 hover:border-amber-400/40 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-300 mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{service.description}</p>
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

        <div className="text-center">
          <a
            href="tel:+94773724849"
            className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-slate-950 font-semibold rounded-full shadow-2xl shadow-amber-500/20 hover:bg-amber-400 transition-colors"
          >
            <PhoneCall className="w-5 h-5 mr-3" />
            Get Free Quotation — Call +94 77 372 4849
          </a>
        </div>
      </div>
    </section>
  );
};
