export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'gal-1',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    title: 'Modern Luxury Villa Living Room',
    category: 'luxury'
  },
  {
    id: 'gal-2',
    src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
    title: 'Minimalist Kitchen Cabinets',
    category: 'kitchen'
  },
  {
    id: 'gal-3',
    src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    title: 'Scandinavian Studio Living',
    category: 'budget'
  },
  {
    id: 'gal-4',
    src: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
    title: 'Bespoke Wardrobe & Wall Paneling',
    category: 'wall'
  },
  {
    id: 'gal-5',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    title: 'Executive Corporate Office Suite',
    category: 'office'
  },
  {
    id: 'gal-6',
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    title: 'Marble Bathroom Vanity & Slabs',
    category: 'luxury'
  },
  {
    id: 'gal-7',
    src: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80',
    title: 'Matte Charcoal Smart Kitchen',
    category: 'kitchen'
  },
  {
    id: 'gal-8',
    src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    title: 'Oak Slatted Accent Wall Panel',
    category: 'wall'
  },
  {
    id: 'gal-9',
    src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    title: 'Sunlit Cozy Workspace',
    category: 'office'
  }
];
