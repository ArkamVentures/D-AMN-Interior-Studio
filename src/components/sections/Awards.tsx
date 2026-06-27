import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, Medal } from 'lucide-react';

const awards = [
  { icon: Trophy, title: 'Best Interior Design Firm 2025', org: 'Design Excellence Awards' },
  { icon: Award, title: 'Innovation in Custom Cabinetry', org: 'National Kitchen & Bath Association' },
  { icon: Star, title: 'Top 50 Interior Designers', org: 'Interior Design Magazine' },
  { icon: Medal, title: 'Sustainable Design Leadership', org: 'Green Building Council' },
  { icon: Trophy, title: 'Best Residential Project', org: 'AIA New York Chapter' },
  { icon: Award, title: 'Excellence in Client Service', org: 'Better Business Bureau' },
];

export const Awards: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-dark-bg border-y border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="text-center group"
            >
              <div className="w-14 h-14 mx-auto bg-accent/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                <award.icon className="w-7 h-7 text-accent" />
              </div>
              <h4 className="text-xs font-semibold text-primary dark:text-white mb-1 leading-tight">
                {award.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">{award.org}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
