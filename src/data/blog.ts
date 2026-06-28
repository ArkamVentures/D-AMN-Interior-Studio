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
    title: 'Why Aluminium is the Future of Modern Home Design',
    excerpt: 'Lightweight, durable, and low-maintenance — discover why aluminium is the top choice for contemporary homes in Sri Lanka.',
    content: 'Aluminium has become the material of choice for modern architects and homeowners. Lightweight, durable, and infinitely recyclable — it’s reshaping how we build. At D-AMN Aluminium Fabrication, we combine premium materials with expert craftsmanship to deliver aluminium solutions that stand the test of time.',
    image: '/gallery-9.png',
    category: 'Industry Trends',
    readTime: '5 min read',
    date: 'June 15, 2026'
  },
  {
    id: 'post-2',
    title: '10 Modern Kitchen Cabinet Ideas for Small Spaces',
    excerpt: 'Smart pantry cupboard designs and sleek aluminium finishes that maximize storage without sacrificing style.',
    content: 'Modern kitchens in smaller homes need smart storage first, and aluminium pantry cupboards deliver. With slim profiles, built-in organization, and moisture-resistant finishes, these solutions keep kitchens clean, efficient, and elegant.',
    image: '/gallery-1.png',
    category: 'Pantry Cupboards',
    readTime: '6 min read',
    date: 'May 28, 2026'
  },
  {
    id: 'post-3',
    title: 'Tempered Glass vs. Regular Glass: What You Need to Know',
    excerpt: 'Compare strength, safety, and style so you can choose the right glass solution for railings, partitions, and shower enclosures.',
    content: 'Tempered glass is stronger, safer, and more durable than regular glass, making it ideal for railings, partitions, and shower cubicles. Learn how 10mm and 12mm options give you both elegance and peace of mind.',
    image: '/gallery-3.png',
    category: 'Glass Works',
    readTime: '4 min read',
    date: 'April 12, 2026'
  }
];
