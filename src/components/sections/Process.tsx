import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { MapPin, Ruler, ClipboardCheck, Wrench, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: MapPin,
    title: '1. Free Site Visit',
    description: 'Our team visits your location to assess the space, take precise measurements, and understand your requirements — completely free of charge.'
  },
  {
    icon: ClipboardCheck,
    title: '2. Free Quotation',
    description: 'We provide a detailed, transparent quotation with best price guaranteed. No hidden charges, no surprises.'
  },
  {
    icon: Ruler,
    title: '3. Design & Approval',
    description: 'We present customizable design options tailored to your space and style preferences. You approve the final design before we proceed.'
  },
  {
    icon: Wrench,
    title: '4. Precision Fabrication',
    description: 'Your aluminium frames, kitchen cabinets, or tempered glass panels are fabricated in our workshop with premium quality materials and expert craftsmanship.'
  },
  {
    icon: ShieldCheck,
    title: '5. Professional Installation',
    description: 'Our skilled installation team ensures a perfect fit with secure mounting, weather sealing, and a thorough quality inspection on completion.'
  }
];

export const Process: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-warm-gray dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Execution Process"
          subtitle="How We Work"
        />

        <div className="relative border-l border-accent/20 max-w-3xl mx-auto pl-8 sm:pl-12 space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Circle Timeline Node */}
              <div className="absolute -left-[53px] sm:-left-[69px] w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center shadow-lg shadow-accent/25 border-4 border-warm-gray dark:border-dark-bg transition-colors">
                <step.icon className="w-5 h-5" />
              </div>
              
              <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-primary dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
