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
    name: 'Abdul Maajith',
    role: 'Founder & Managing Director',
    bio: 'With extensive experience in aluminium fabrication across Sri Lanka, Abdul leads D-AMN with a vision to deliver premium, customizable architectural solutions to every client.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80'
  },
  {
    id: 'member-2',
    name: 'Amna Nazeer',
    role: 'Co-Founder & Design Head',
    bio: 'Amna specializes in modern aluminium and glass design solutions, ensuring every project blends contemporary aesthetics with practical durability.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80'
  },
  {
    id: 'member-3',
    name: 'Rishad Mansoor',
    role: 'Head of Fabrication',
    bio: 'Rishad leads our state-of-the-art fabrication workshop, overseeing precision aluminium cutting, assembly, and tempered glass installations.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80'
  },
  {
    id: 'member-4',
    name: 'Dilshani Perera',
    role: 'Kitchen Cabinet Specialist',
    bio: 'Dilshani designs and coordinates modern aluminium kitchen cabinet projects, ensuring every installation meets the highest standards of quality and functionality.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80'
  }
];
