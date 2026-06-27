export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Danuka Alwis',
    role: 'Founder & Principal Designer',
    bio: 'With over 12 years of experience in luxury interior architecture across South Asia, Danuka spearheads the design language and artistic vision of D-AMN.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80'
  },
  {
    id: 'member-2',
    name: 'Amna Nazeer',
    role: 'Co-Founder & Lead Architect',
    bio: 'Amna specializes in space optimization, spatial flow mapping, and residential layouts, blending comfort with contemporary luxury.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80'
  },
  {
    id: 'member-3',
    name: 'Rishad Mansoor',
    role: 'Head of Aluminium Fabrication',
    bio: 'Rishad leads our state-of-the-art metal and profile workshop, overseeing precision structural assembly and partition systems.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80'
  },
  {
    id: 'member-4',
    name: 'Dilshani Perera',
    role: 'Gypsum & Ceiling Specialist',
    bio: 'Dilshani coordinates suspended gypsum ceilings, architectural lighting systems, and custom acoustic ceiling layouts.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80'
  }
];
