import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCircle2 } from 'lucide-react';

const googleReviews = [
  {
    id: '1',
    name: 'Mathees Wakar',
    avatar: 'M',
    avatarColor: '#5F6368',
    date: '3 weeks ago',
    rating: 5,
    text: 'Clean finish, quality workmanship, and a modern look. Very happy with the ceiling installation by D-AMN Aluminium Fabrication. Highly recommended!',
    isLong: false,
  },
  {
    id: '2',
    name: 'Umar Mohamed umar',
    avatar: 'U',
    avatarColor: '#1E8E3E',
    date: 'a year ago',
    rating: 5,
    text: 'D-AMN ALUMINUM FABRICATION delivers top-quality tempered glass work with precision and durability. Their craftsmanship is outstanding, ensuring a sleek and sturdy finish. Highly recommended for anyone looking for reliable and professional glass installations!',
    isLong: true,
  },
  {
    id: '3',
    name: 'Arkam Ahamed',
    avatar: 'A',
    avatarColor: '#F9AB00',
    date: 'a year ago',
    rating: 5,
    text: "I recently had aluminum partitions installed by D-AMN ALUMINUM FABRICATION, and I'm extremely satisfied with the results. The team was professional, punctual, and paid great attention to detail. The partition design was sleek, modern, and ...",
    isLong: true,
  },
  {
    id: '4',
    name: 'sifath msbg',
    avatar: 'S',
    avatarColor: '#D93025',
    date: 'a year ago',
    rating: 5,
    text: 'Solid work by D-AMN ALUMINUM FABRICATION! The aluminum pantry cupboard looks like wood, feels premium, and is built to last. Clean finish and top quality!',
    isLong: false,
  },
  {
    id: '5',
    name: 'Haneef Rahman',
    avatar: 'H',
    avatarColor: '#1A73E8',
    date: 'a year ago',
    rating: 5,
    text: 'Excellent ceiling work by D-AMN ALUMINUM FABRICATION! High-quality materials, professional installation, and great attention to detail. Highly recommended!',
    isLong: false,
  },
  {
    id: '6',
    name: 'Muhammed Rushdy Saeed Hakeem',
    avatar: 'M',
    avatarColor: '#188038',
    date: 'a year ago',
    rating: 5,
    text: 'D-AMN ALUMINUM FABRICATION delivers high-quality casement windows with durable aluminum frames and smooth operation. The craftsmanship is precise, and the installation is flawless. Highly recommended for stylish and reliable windows!',
    isLong: true,
  },
  {
    id: '7',
    name: 'Asmath Sahi',
    avatar: 'A',
    avatarColor: '#F9AB00',
    date: '3 weeks ago',
    rating: 5,
    text: 'Very satisfied with the wall design done by D-AMN Aluminium Fabrication. Quality workmanship, clean finishing, and professional service. The final result looks modern and elegant. Highly recommended!',
    isLong: false,
  },
  {
    id: '8',
    name: 'Ayash Ahamath',
    avatar: 'A',
    avatarColor: '#D93025',
    date: '3 weeks ago',
    rating: 5,
    text: 'Highly Recommended! Huge thanks to D-AMN ALUMINUM FABRICATION for doing such an amazing job on our room ceiling. The installation is perfectly straight, seamless, and gives the ...',
    isLong: true,
  },
];

export const GoogleReviews: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 336;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-[0.2em] text-gray-900 md:text-3xl">
          WHAT OUR CUSTOMERS SAY
        </h2>

        <div className="mb-10 text-center">
          <p className="mb-2 text-3xl font-bold text-gray-900">EXCELLENT</p>
          <div className="mb-3 flex justify-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Star key={index} className="h-8 w-8 fill-[#F4B400] text-[#F4B400]" />
            ))}
          </div>
          <p className="mb-2 text-gray-600">
            Based on <span className="font-semibold">19 reviews</span>
          </p>
          <div className="flex justify-center">
            <svg viewBox="0 0 272 92" className="h-auto w-20" aria-label="Google reviews">
              <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
              <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
              <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" />
              <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
              <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" />
              <path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg transition hover:bg-gray-50 md:flex"
            aria-label="Scroll reviews left"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>

          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg transition hover:bg-gray-50 md:flex"
            aria-label="Scroll reviews right"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-4 overflow-x-auto px-2 py-4 pb-6 scroll-smooth sm:px-3 md:px-14"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
            }}
          >
            {googleReviews.map((review) => {
              const isExpanded = expandedIds.has(review.id);

              return (
                <div
                  key={review.id}
                  className="review-card flex h-full min-h-[220px] flex-shrink-0 w-[300px] flex-col rounded-xl border border-gray-100 bg-gray-50 p-5 sm:w-[320px]"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="mb-3 flex items-start gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full text-xl font-medium text-white"
                      style={{ backgroundColor: review.avatarColor }}
                    >
                      {review.avatar}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-semibold text-gray-900">{review.name}</h4>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>

                    <div className="flex-shrink-0 rounded-full bg-green-50 p-1 text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mb-3 flex gap-0.5">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-[#F4B400] text-[#F4B400]" />
                    ))}
                  </div>

                  <p className={`flex-1 text-sm leading-relaxed text-gray-700 ${review.isLong && !isExpanded ? 'line-clamp-3' : ''}`}>
                    {review.text}
                  </p>

                  {review.isLong && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(review.id)}
                      className="mt-3 text-sm text-gray-500 transition hover:text-gray-700"
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
