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
    title: 'The Art of Minimalist Luxury in Modern Apartments',
    excerpt: 'Discover how to create an expansive, luxurious feel in urban apartments using hidden storage, clean lines, and a curated neutral palette.',
    content: 'Minimalism is not about empty spaces; it is about intentional design. In modern urban apartments, achieving a sense of luxury requires balancing clean aesthetics with functional design. We focus on flush-to-wall cabinetry, integrated lighting solutions, and premium natural materials like white oak and travertine to create a quiet, sophisticated sanctuary.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    category: 'Trends',
    readTime: '5 min read',
    date: 'June 15, 2026'
  },
  {
    id: 'post-2',
    title: 'Kitchen Engineering: Choosing the Right Hardware',
    excerpt: 'A deep dive into high-end hinges, runners, and storage mechanisms that define a truly luxurious kitchen experience.',
    content: 'A beautiful kitchen is only as good as its functionality. When engineering high-end kitchens, we look beneath the surface. Using premier German hardware like Blum Legrabox and Häfele storage systems ensures drawers slide silently and doors close with satisfying precision. Learn how to plan cabinet loads and choose the right structural fittings.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
    category: 'Engineering',
    readTime: '8 min read',
    date: 'May 28, 2026'
  },
  {
    id: 'post-3',
    title: 'Integrating Smart Home Technology Invisibly',
    excerpt: 'How to design structural layouts that house automated climate, lighting, and audio systems without disrupting your walls.',
    content: 'Smart homes are the future, but visible wires, bulky keypads, and massive control boxes can ruin a space. In this article, we demonstrate our engineering approach to concealing home automation hardware. From hidden ceiling speakers to flush wall panels and invisible wiring channels, we keep your technology seamless and discrete.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
    category: 'Technology',
    readTime: '6 min read',
    date: 'April 12, 2026'
  }
];
