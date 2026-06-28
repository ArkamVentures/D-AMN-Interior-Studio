export interface Project {
  id: string;
  name: string;
  category: string;
  location: string;
  budget: string;
  completionDate: string;
  testimonial: string;
  featured: boolean;
  images: string[];
}

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Luxury Villa Aluminium Doors & Windows',
    category: 'Aluminium Doors & Windows',
    location: 'Colombo, LK',
    budget: 'Premium',
    completionDate: 'November 2025',
    testimonial: 'D-AMN Aluminium Fabrication installed stunning sliding doors and casement windows throughout our villa. The quality is exceptional and the modern look has completely transformed our home.',
    featured: true,
    images: [
      '/gallery-9.png',
      '/gallery-11.png'
    ]
  },
  {
    id: 'proj-2',
    name: 'Modern Kitchen Cabinet Installation',
    category: 'Kitchen Cabinets',
    location: 'Kandy, LK',
    budget: 'Standard',
    completionDate: 'February 2026',
    testimonial: 'Our new aluminium kitchen cabinets are incredible — completely waterproof, rust-free, and the soft-close doors are a joy to use. Zero maintenance and looks brand new every day!',
    featured: true,
    images: [
      '/gallery-1.png',
      '/gallery-2.png'
    ]
  },
  {
    id: 'proj-3',
    name: 'Hotel Tempered Glass Railings',
    category: 'Tempered Glass Works',
    location: 'Galle, LK',
    budget: 'Premium',
    completionDate: 'April 2026',
    testimonial: 'D-AMN installed 12mm tempered glass railings with stainless steel fittings across our entire hotel. The crystal clear finish and elegant design have elevated our property beautifully.',
    featured: true,
    images: [
      '/gallery-10.png',
      '/gallery-12.png'
    ]
  }
];
