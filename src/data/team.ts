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
    name: 'Mohamed Arkam',
    role: 'Founder & Lead Fabricator',
    bio: 'With over 15 years of experience in aluminium fabrication, Arkam founded D-AMN with a vision to deliver precision-crafted solutions across the Southern Province.',
  },
  {
    id: 'team-2',
    name: 'Fathima Nishana',
    role: 'Project Manager',
    bio: 'Nishana coordinates all client projects from initial consultation to final installation, ensuring every job is delivered on time and to specification.',
  },
  {
    id: 'team-3',
    name: 'Ismail Rifaz',
    role: 'Senior Fabricator',
    bio: 'Rifaz brings a decade of hands-on workshop expertise, specialising in custom aluminium profiles and structural assemblies.',
  },
];
