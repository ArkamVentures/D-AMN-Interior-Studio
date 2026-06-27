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
    name: 'Free Consultation',
    price: 'Free',
    description: 'Get started with a free site visit and quotation — no obligations.',
    features: [
      'Free site visit & measurements',
      'Detailed project quotation',
      'Design consultation & recommendations',
      'Material & style guidance',
      'Best price guaranteed'
    ],
    highlighted: false
  },
  {
    id: 'pkg-2',
    name: 'Standard Package',
    price: 'Custom Quote',
    description: 'Complete aluminium or glass installation with premium materials and expert craftsmanship.',
    features: [
      'Premium quality aluminium/glass materials',
      'Custom design & fabrication',
      'Professional installation',
      'Weather-resistant finishes',
      'Quality assurance inspection',
      'After-installation support'
    ],
    highlighted: true
  },
  {
    id: 'pkg-3',
    name: 'Premium Package',
    price: 'Custom Quote',
    description: 'Full turnkey solution for large-scale residential and commercial projects.',
    features: [
      'Dedicated project manager',
      'Complete site coordination',
      'Premium grade materials & hardware',
      'Multiple product installations',
      'Priority scheduling & execution',
      'Extended warranty & maintenance'
    ],
    highlighted: false
  }
];
