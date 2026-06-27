export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted: boolean;
}

export const pricingPackages: PricingPackage[] = [
  {
    id: 'pkg-1',
    name: 'Essential Consultation',
    price: '$2,500',
    description: 'Perfect for spatial layout reviews and basic design guidelines.',
    features: [
      '2D Layout & spatial floorplans',
      'Color & material concept consultation',
      'Mood boards & lighting suggestions',
      'Furniture & decoration shopping list',
      '1 Revision request cycle'
    ],
    highlighted: false
  },
  {
    id: 'pkg-2',
    name: 'Signature Design',
    price: '$7,500',
    description: 'Comprehensive design package including bespoke custom cabinetry blueprints.',
    features: [
      'Full 3D digital renderings',
      'Bespoke kitchen & cabinetry engineering blueprints',
      'Detailed lighting plans & electrical layouts',
      'Material sample package delivered to you',
      '3 Revision cycles included',
      'Direct designer messaging'
    ],
    highlighted: true
  },
  {
    id: 'pkg-3',
    name: 'Elite Turnkey',
    price: 'Custom Quote',
    description: 'End-to-end luxury management, from layouts to contracting and styling.',
    features: [
      'Dedicated interior architect & coordinator',
      'Complete contractor oversight & management',
      'Custom fabrication in our master workshop',
      'White-glove styling and staging setup',
      'Post-occupancy warranty & maintenance check'
    ],
    highlighted: false
  }
];
