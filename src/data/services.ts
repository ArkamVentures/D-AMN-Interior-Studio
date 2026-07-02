export interface Service {
  id: string;
  title: string;
  tagline: string;
  features: string[];
  iconName: string;
}

export const servicesList: Service[] = [
  {
    id: 'svc-1',
    title: 'Aluminium Doors & Windows',
    tagline: 'Built to last in every climate',
    features: ['Strong & Secure', 'Weatherproof Finish', 'Low Maintenance', 'Custom Sizing'],
    iconName: 'Wind',
  },
  {
    id: 'svc-2',
    title: 'Custom Aluminium Fabrication',
    tagline: 'Precision for every project',
    features: ['Bespoke Profiles', 'Industrial Strength', 'High-Quality Welds', 'Fast Turnaround'],
    iconName: 'Hammer',
  },
  {
    id: 'svc-3',
    title: 'Industrial Aluminium Structures',
    tagline: 'Engineered for demanding sites',
    features: ['Heavy Duty Frames', 'Corrosion Resistant', 'Structural Stability', 'Site Ready'],
    iconName: 'Layers',
  },
  {
    id: 'svc-4',
    title: 'Aluminium Partitions & Cladding',
    tagline: 'Sleek finishes with industrial reliability',
    features: ['Clean Aesthetic', 'Durable Panels', 'Quick Installation', 'Weather Resistant'],
    iconName: 'Grid',
  },
  {
    id: 'svc-5',
    title: 'Shopfronts & Facades',
    tagline: 'Make your business stand out',
    features: ['Signature Design', 'Durable Materials', 'Secure Systems', 'Premium Finishes'],
    iconName: 'Box',
  },
  {
    id: 'svc-6',
    title: 'Gutter Systems & Drainage',
    tagline: 'Protect every roof edge',
    features: ['Robust Channels', 'Weatherproof Seal', 'Low Maintenance', 'Precision Fit'],
    iconName: 'Droplet',
  },
  {
    id: 'svc-7',
    title: 'Aluminium Fixtures & Railings',
    tagline: 'Strong form for functional spaces',
    features: ['Custom Railings', 'Balcony Frames', 'Staircase Systems', 'Safety First'],
    iconName: 'Package',
  },
  {
    id: 'svc-8',
    title: 'Glass & Aluminium Assemblies',
    tagline: 'Modern transparency with structural support',
    features: ['Tempered Glass', 'Framed Systems', 'Protective Coatings', 'Seamless Integration'],
    iconName: 'Sparkles',
  },
  {
    id: 'svc-9',
    title: 'Commercial Fabrication Solutions',
    tagline: 'Reliable delivery for larger builds',
    features: ['Project Management', 'On-site Assembly', 'Quality Control', 'Industrial Compliance'],
    iconName: 'LayoutGrid',
  },
];
