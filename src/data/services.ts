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
    id: 'interior-design',
    title: 'Custom Interior Design',
    description: 'Bespoke conceptualization, floor plans, 3D renderings, and spatial flows tailored to your unique requirements and aesthetic.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    icon: 'LayoutGrid',
    benefits: [
      'Tailored custom design concepts',
      'Realistic 3D visualizations before build',
      'Intelligent spatial layouts & flow optimization',
      'Comprehensive material board options'
    ],
    process: [
      'Client brief & design alignment',
      'Initial layout plans & sketch concepts',
      '3D Rendering & material spec presentation',
      'Execution blueprint generation'
    ]
  },
  {
    id: 'aluminium-fabrication',
    title: 'Aluminium Fabrication',
    description: 'Expert structural and aesthetic fabrication of high-quality aluminium frames, doors, windows, and custom structural elements.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    icon: 'Hammer',
    benefits: [
      'Rust-proof, high-durability modern frames',
      'Sleek, minimalist profile layouts',
      'Thermal insulation and noise reduction fitting',
      'Precision structural load calculations'
    ],
    process: [
      'Site structural laser measurement',
      'Frame design approval & cutting specs',
      'Precision jointing & welding in our workshop',
      'Secure site installation & weather proofing'
    ]
  },
  {
    id: 'modern-kitchens',
    title: 'Modern Kitchen Design & Installation',
    description: 'State-of-the-art modular kitchens blending premium storage layouts, custom cabinetry, and top-tier silent drawer mechanisms.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
    icon: 'ChefHat',
    benefits: [
      'Ergonomic, modern cooking layouts',
      'Premium soft-close hinges & pull-out pantries',
      'Durable, moisture-resistant carcass materials',
      'Integration of modern built-in appliances'
    ],
    process: [
      'Work triangle and appliance planning',
      'Cabinet layout & countertop sourcing',
      'Pre-assembly quality check in shop',
      'On-site installation and fitting adjustment'
    ]
  },
  {
    id: 'gypsum-ceilings',
    title: 'Gypsum Ceiling Solutions',
    description: 'Innovative suspended plasterboard ceilings incorporating indirect LED coves, architectural steps, and custom acoustics.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
    icon: 'Box',
    benefits: [
      'Perfect flush joint finish with zero crack risk',
      'Integration of discrete cove lighting',
      'Improved heat and sound insulation',
      'Custom profiles (curved, multi-level)'
    ],
    process: [
      'Ceiling plan & lighting layout drawing',
      'Metal channel framing assembly & leveling',
      'Gypsum board fixing & joint taping',
      'Skim coating and luxury matte painting'
    ]
  },
  {
    id: 'aluminium-partitions',
    title: 'Aluminium Partition Systems',
    description: 'Sleek, slimline glass and aluminium partition walls to divide corporate offices, study areas, and residential rooms.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    icon: 'LayoutGrid',
    benefits: [
      'Saves space with thin, strong structural borders',
      'High-grade acoustic soundproof glass options',
      'Easy to dismantle, shift, and re-install',
      'Maximized natural light transmission'
    ],
    process: [
      'Floor and ceiling track alignment scans',
      'Profile extrusion fabrication & coloring',
      'Glass panel sizing and fitting verification',
      'Site framework assembly and glass staging'
    ]
  },
  {
    id: 'residential-interiors',
    title: 'Residential Interior Renovation',
    description: 'Full-scale home transformations, including living room styling, luxury master suites, and cozy dining spaces.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    icon: 'Sofa',
    benefits: [
      'Complete cohesive color and texture plans',
      'Bespoke TV walls, fireplace, and lounge designs',
      'Integration of home automation systems',
      'Maximized closet and storage utilization'
    ],
    process: [
      'Functional needs assessment',
      'Furniture and lighting planning',
      'Wall and ceiling finishes coordination',
      'White-glove handover and staging setup'
    ]
  },
  {
    id: 'commercial-interiors',
    title: 'Commercial Interior Projects',
    description: 'High-performance commercial interior environments for hotels, restaurants, retail outlets, and showrooms.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    icon: 'Briefcase',
    benefits: [
      'Acoustic and foot-traffic optimized designs',
      'Highly durable commercial-grade materials',
      'Branded design schemes matching corporate identity',
      'Compliant with commercial safety codes'
    ],
    process: [
      'Branded workflow & operations study',
      'Zoning layout & egress configuration design',
      'Durability and lighting layout specifications',
      'Out-of-hours rapid construction execution'
    ]
  },
  {
    id: 'office-design',
    title: 'Office & Educational Space Design',
    description: 'Ergonomic workspaces, classrooms, and libraries designed to foster productivity, collaboration, and learning.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    icon: 'Briefcase',
    benefits: [
      'Ergonomic desk and desk chair configurations',
      'Noise-absorbing acoustic panels and setups',
      'Clever cord-concealment layouts',
      'Fosters creative and quiet work zones'
    ],
    process: [
      'Occupancy workflow analysis',
      'Furniture density configuration plans',
      'Power grid & network layout drafting',
      'Rapid structural and furniture assembly'
    ]
  },
  {
    id: 'custom-furniture',
    title: 'Custom Furniture & Space Planning',
    description: 'Tailor-made console units, display shelves, vanity counters, and study tables engineered to fit your spatial constraints.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
    icon: 'Armchair',
    benefits: [
      'Sub-millimeter sizing for a perfect niche fit',
      'Unique material and grain selections',
      'Integrated wire grommets and hidden lighting',
      'Heirloom-grade custom joinery construction'
    ],
    process: [
      'Furniture size & function audit',
      'Sourcing premium veneers & hardware components',
      'Joinery carving and alignment checks',
      'Delivery and on-site alignment fitting'
    ]
  }
];
