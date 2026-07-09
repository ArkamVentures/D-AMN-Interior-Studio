import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix = '', label }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
    return undefined;
  }, [isInView, count, value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-4 bg-white/5 dark:bg-dark-card/50 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm backdrop-blur-sm">
      <div className="flex items-baseline gap-1">
        <motion.span className="text-4xl md:text-5xl font-bold text-accent">
          {rounded}
        </motion.span>
        {suffix && <span className="text-2xl md:text-3xl font-bold text-accent">{suffix}</span>}
      </div>
      <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wider text-center">
        {label}
      </p>
    </div>
  );
};

export const AnimatedStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-5xl mx-auto mb-16">
      <AnimatedCounter value={110} suffix="+" label="Projects" />
      <AnimatedCounter value={25} suffix="+" label="Clients" />
      <AnimatedCounter value={12} suffix="" label="Districts" />
      <AnimatedCounter value={8} suffix="yrs" label="Experience" />
    </div>
  );
};
