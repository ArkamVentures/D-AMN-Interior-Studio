export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  benefits: string[];
  process: string[];
}

export const services: Service[] = [
  {
    id: 'aluminium-doors-windows',
    title: 'Aluminium Doors & Windows',
    description: 'Premium aluminium frames for homes and commercial spaces. Designed for modern living with sleek aesthetics, our doors and windows are strong, fully recyclable, customizable, and weather-resistant.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    icon: 'DoorOpen',
    benefits: [
      'Strong & stylish premium aluminium frames',
      'Fully recyclable and eco-friendly materials',
      'Customizable designs for any space',
      'Weather-resistant and durable finish'
    ],
    process: [
      'Free site visit & precise measurements',
      'Design consultation & style selection',
      'Precision fabrication in our workshop',
      'Professional on-site installation'
    ]
  },
  {
    id: 'modern-kitchen-cabinets',
    title: 'Modern Kitchen Cabinets',
    description: 'Rust-proof, termite-free, waterproof, and fire-resistant aluminium kitchen cabinets. Built for maximum durability with contemporary styling and zero maintenance required.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    icon: 'ChefHat',
    benefits: [
      'Rust-proof & termite-free construction',
      'Waterproof body with fire-resistant materials',
      'Soft-close doors & modern hardware',
      'Hygienic, safe & zero maintenance'
    ],
    process: [
      'Kitchen space assessment & planning',
      'Cabinet layout & design approval',
      'Premium fabrication with quality checks',
      'Installation & hardware fitting'
    ]
  },
  {
    id: 'tempered-glass-works',
    title: 'Tempered Glass Works',
    description: 'Premium 10mm & 12mm tempered glass installations for balcony railings, staircase railings, glass partitions, shower cubicles, and glass handrails with stainless steel fittings.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    icon: 'GlassWater',
    benefits: [
      'Strong, safe 10mm & 12mm tempered glass',
      'Rust-free stainless steel fittings',
      'Crystal clear finish with elegant design',
      'Weather-resistant & long-lasting quality'
    ],
    process: [
      'Site inspection & glass requirements analysis',
      'Custom sizing & design specification',
      'Tempered glass cutting & edge polishing',
      'Secure installation with SS fittings'
    ]
  }
];
