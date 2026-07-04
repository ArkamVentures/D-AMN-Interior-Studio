export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Mohamed Nowful',
    role: 'Founder & CEO',
    bio: 'Visionary founder behind D-AMN Aluminium Fabrication with 20+ years of hands-on experience in aluminium fabrication and interior solutions. Leads the company with deep industry expertise and unwavering commitment to quality craftsmanship.',
    image: '/team/nowful.jpg',
  },
  {
    id: 'team-2',
    name: 'Abdul Maajidh',
    role: 'Managing Director',
    bio: 'Interior Engineering undergraduate and managing director at D-AMN. Oversees day-to-day operations, project management, and client relations with hands-on expertise in aluminium fabrication and interior execution.',
    image: '/team/maajidh.jpg',
  },
];
