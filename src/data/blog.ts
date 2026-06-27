export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Why Aluminium Doors Are the Best Choice for Modern Homes',
    excerpt: 'Discover the advantages of premium aluminium doors — from weather resistance and durability to sleek modern aesthetics that transform any home.',
    content: 'Aluminium doors have become the preferred choice for modern homeowners across Sri Lanka. Unlike traditional wooden doors, aluminium frames are rust-proof, weather-resistant, and require virtually zero maintenance. They offer sleek, minimalist profiles that let in maximum natural light while providing excellent thermal insulation. With options like sliding doors, folding doors, and casement designs, aluminium doors bring both beauty and functionality to your home.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    category: 'Aluminium',
    readTime: '5 min read',
    date: 'June 15, 2026'
  },
  {
    id: 'post-2',
    title: 'Aluminium Kitchen Cabinets: The Future of Modern Kitchens',
    excerpt: 'Learn why aluminium kitchen cabinets are replacing traditional wood — rust-proof, termite-free, waterproof, and built to last a lifetime.',
    content: 'Traditional wooden kitchen cabinets are prone to termite damage, water swelling, and rust from humidity. Aluminium kitchen cabinets solve all these problems with their rust-proof, termite-free, and waterproof construction. They are fire-resistant, hygienic, and come with modern soft-close mechanisms. Zero maintenance means you save time and money while enjoying a kitchen that looks brand new for decades.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    category: 'Kitchens',
    readTime: '6 min read',
    date: 'May 28, 2026'
  },
  {
    id: 'post-3',
    title: 'Tempered Glass Railings: Safety Meets Elegance',
    excerpt: 'How tempered glass railings with stainless steel fittings can elevate your balcony, staircase, and swimming pool areas with crystal clear elegance.',
    content: 'Tempered glass railings are the gold standard for modern architectural design. Using 10mm and 12mm tempered glass, these installations provide unmatched safety and stunning visual appeal. Whether for balcony railings, staircase railings, or swimming pool barriers, tempered glass offers crystal clear views, rust-free stainless steel fittings, and weather-resistant durability. They are perfect for houses, hotels, villas, and commercial buildings.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    category: 'Glass Works',
    readTime: '4 min read',
    date: 'April 12, 2026'
  }
];
