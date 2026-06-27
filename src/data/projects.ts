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
    name: 'Luxury Residence Penthouse',
    category: 'Interior Design',
    location: 'Colombo, LK',
    budget: '$150,000',
    completionDate: 'November 2025',
    testimonial: 'D-AMN Interior Studio transformed our home into a modern masterpiece. The gold accent finishes and custom gypsum ceiling light coves look absolutely breathtaking.',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'
    ]
  },
  {
    id: 'proj-2',
    name: 'Sleek Modular Show Kitchen',
    category: 'Modern Kitchens',
    location: 'Kandy, LK',
    budget: '$45,000',
    completionDate: 'February 2026',
    testimonial: 'The cabinet engineering is flawless. Silent hinges, custom charcoal storage drawers, and gold accents create a stunning aesthetic. A joy to cook in.',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
      'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80'
    ]
  },
  {
    id: 'proj-3',
    name: 'Corporate Office Partitions',
    category: 'Aluminium Partitions',
    location: 'Colombo, LK',
    budget: '$85,000',
    completionDate: 'April 2026',
    testimonial: 'We needed modular soundproof workspaces. D-AMN designed slim black aluminium partition systems that look clean, professional, and let in abundant light.',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80'
    ]
  }
];
