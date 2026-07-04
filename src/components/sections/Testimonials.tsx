import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "D-AMN Aluminium Fabrication installed beautiful sliding doors throughout our home. The quality of the aluminium frames is exceptional, and the modern design has completely transformed how our house looks and feels.",
    name: "Samantha & Ravi Perera",
    role: "Homeowners, Colombo",
    rating: 5
  },
  {
    quote: "Our new aluminium kitchen cabinets are incredible — completely waterproof, zero maintenance, and the soft-close mechanism is a daily luxury. We should have switched from wood years ago!",
    name: "Fathima Rizwan",
    role: "Villa Owner, Galle",
    rating: 5
  },
  {
    quote: "The 12mm tempered glass balcony railings D-AMN installed at our hotel are stunning. Crystal clear finish, rust-free fittings, and they delivered on time with the best price. Highly recommend!",
    name: "Kamal Jayasinghe",
    role: "Hotel Owner, Kandy",
    rating: 5
  }
];

export const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const next = () => {
    setIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-dark-bg transition-colors duration-300 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Testimonials"
        />

        <div className="relative min-h-[300px] flex items-center justify-center">
          <Quote className="absolute top-0 left-0 w-24 h-24 text-accent/5 -translate-x-12 -translate-y-8 select-none animate-pulse" />
          
<AnimatePresence mode="wait">
             <motion.div
               key={index}
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -50 }}
               transition={{ duration: 0.4 }}
               className="review-card px-6 sm:px-12"
             >
              <div className="flex justify-center mb-6 space-x-1">
                {[...Array(testimonials[index].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>

              <p className="text-xl sm:text-2xl font-serif italic text-primary dark:text-white leading-relaxed mb-8">
                "{testimonials[index].quote}"
              </p>

              <div>
                <h4 className="font-semibold text-primary dark:text-white text-base">
                  {testimonials[index].name}
                </h4>
                <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">
                  {testimonials[index].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center space-x-4 mt-12">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 hover:border-accent text-primary dark:text-white hover:text-accent flex items-center justify-center transition-colors"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 hover:border-accent text-primary dark:text-white hover:text-accent flex items-center justify-center transition-colors"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
