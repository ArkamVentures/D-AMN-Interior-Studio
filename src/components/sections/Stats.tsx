import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '../ui/AnimatedCounter';

export const Stats: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-primary dark:bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <AnimatedCounter end={10} suffix="+" label="Years Experience" />
          <AnimatedCounter end={100} suffix="+" label="Projects Completed" />
          <AnimatedCounter end={100} suffix="%" label="Client Satisfaction" />
          <AnimatedCounter end={9} suffix="" label="Core Services" />
        </div>
      </div>
    </section>
  );
};
