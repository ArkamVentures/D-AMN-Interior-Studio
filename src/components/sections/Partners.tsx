import React from 'react';

const partners = [
  'Alumex', 'Hindalco', 'Saint-Gobain', 'Blum', 'Häfele', 'Hettich'
];

export const Partners: React.FC = () => {
  return (
    <section className="py-12 bg-warm-gray dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] mb-8">
          Premium Materials & Hardware Partners
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
          {partners.map((partner) => (
            <span
              key={partner}
              className="text-lg md:text-xl font-serif font-semibold text-primary dark:text-white"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
