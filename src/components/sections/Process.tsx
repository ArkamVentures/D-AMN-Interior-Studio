import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { MessageSquare, Layers, ShieldCheck, Ruler, Wrench } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: '1. Discovery & Consultation',
    description: 'We meet to align on your vision, budget parameters, design aesthetic preferences, and site restrictions.'
  },
  {
    icon: Layers,
    title: '2. Schematic Concept Design',
    description: 'We draft mood boards, architectural floor layouts, color palettes, and material proposals.'
  },
  {
    icon: Ruler,
    title: '3. Technical Engineering',
    description: 'Our team designs micro-detail blueprints for custom joinery, electrical systems, lighting, and load-bearing structures.'
  },
  {
    icon: Wrench,
    title: '4. Fabrication & Sourcing',
    description: 'Custom cabinetry is crafted in our wood workshop while custom furniture and stone slabs are imported.'
  },
  {
    icon: ShieldCheck,
    title: '5. Installation & Turnkey Staging',
    description: 'Our crew manages full installation, finishing details, and interior decoration to deliver a move-in ready luxury space.'
  }
];

export const Process: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-warm-gray dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Execution Process"
          subtitle="Concept to Reality"
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
