import React, { createContext, useContext, useState, useEffect } from 'react';

// Interfaces
export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  features: string[];
  iconName: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  whatsapp?: string;
  email?: string;
  linkedin?: string;
  badge?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  location: string;
  budget: string;
  completionDate: string;
  testimonial: string;
  featured: boolean;
  images: string[];
}

export interface ProjectPhotoItem {
  id: string;
  src: string;
  location: string;
  service: string;
  title: string;
}

export interface PricingPackageItem {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted: boolean;
}

export interface BlogPostItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  status: 'draft' | 'published';
}

export interface ContactDetails {
  phone: string;
  email: string;
  address: string;
  hours: string;
  whatsapp: string;
}

export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  service: string;
  phone?: string;
  message: string;
  date: string;
  read: boolean;
}

export interface GlobalSettingsItem {
  logoText: string;
  logoSubtext: string;
  footerCopyright: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  whatsappLink: string;
  googleMaps: string;
  maintenanceMode: boolean;
}

export interface DataContextType {
  // Hero / Home Banner Settings
  heroTitle: string;
  heroSubtitle: string;
  heroKeywords: string[];
  setHeroTitle: (v: string) => void;
  setHeroSubtitle: (v: string) => void;
  setHeroKeywords: (v: string[]) => void;

  // About Tab Settings
  aboutTitle: string;
  aboutSubtitle: string;
  aboutParagraph: string;
  team: TeamMember[];
  setAboutTitle: (v: string) => void;
  setAboutSubtitle: (v: string) => void;
  setAboutParagraph: (v: string) => void;
  setTeam: (v: TeamMember[]) => void;

  // Services Tab
  servicesList: ServiceItem[];
  setServicesList: (v: ServiceItem[]) => void;

  // Portfolio & Gallery
  projectsList: ProjectItem[];
  projectPhotosList: ProjectPhotoItem[];
  setProjectsList: (v: ProjectItem[]) => void;
  setProjectPhotosList: (v: ProjectPhotoItem[]) => void;

  // Pricing Tab
  pricingList: PricingPackageItem[];
  setPricingList: (v: PricingPackageItem[]) => void;

  // Blog Tab
  blogsList: BlogPostItem[];
  setBlogsList: (v: BlogPostItem[]) => void;

  // Contact Info
  contact: ContactDetails;
  setContact: (v: ContactDetails) => void;

  // Contact Form Submissions
  submissionsList: FormSubmission[];
  setSubmissionsList: (v: FormSubmission[]) => void;
  addSubmission: (submission: Omit<FormSubmission, 'id' | 'date' | 'read'>) => void;

  // Global Settings
  globalSettings: GlobalSettingsItem;
  setGlobalSettings: (v: GlobalSettingsItem) => void;

  // Custom Dashboard Stats Overrides
  dashboardStatsOverrides: {
    totalProjects: string;
    blogPosts: string;
    pendingEnquiries: string;
    activeServices: string;
  };
  setDashboardStatsOverrides: (v: any) => void;

  // Reset function to restore original data
  resetAllData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial Static Data
const initialHeroTitle = "We Engineer Modern Spaces That Last";
const initialHeroSubtitle = "Aluminium • Glass • Kitchens • Ceilings • Cladding • Partitions • Gutters • Shop Fittings";
const initialHeroKeywords = [
  'Aluminium',
  'Glass',
  'Kitchens',
  'Ceilings',
  'Cladding',
  'Partitions',
  'Gutters',
  'Shop Fittings',
];

const initialAboutTitle = "The Complete Interior Partner";
const initialAboutSubtitle = "From Dharga Town to every corner of the island — quality you can see";
const initialAboutParagraph = "D-AMN Aluminium Fabrication is a full-service interior and aluminium solutions studio based in Dharga Town, Sri Lanka. We specialize in aluminium doors & windows, tempered glass works, modern kitchen cabinets, gypsum & I-panel ceilings, ACP cladding, aluminium partitions, gutter works, and complete shop fittings. Led by Maajidh, an Interior Engineering undergraduate, we deliver premium craftsmanship with modern design, zero maintenance, and lasting durability — backed by free site visits and best price guarantee.";

const initialTeam: TeamMember[] = [
  {
    name: "Nowful",
    role: "Founder & CEO",
    bio: "Visionary founder behind D-AMN Aluminium Fabrication with 20+ years of hands-on experience in aluminium fabrication and interior solutions. Nowful leads the company with deep industry expertise, a passion for modern design, and an unwavering commitment to quality craftsmanship. From concept to completion, he ensures every project reflects durability, innovation, and timeless style.",
    image: "/founder.png",
    whatsapp: "94773724849",
    email: "damnaluminiumfabrication@gmail.com",
    badge: "20+ Years Experience"
  },
  {
    name: "Maajidh",
    role: "Managing Director",
    bio: "Interior Engineering undergraduate and managing director at D-AMN. Maajidh oversees day-to-day operations, project management, and client relations with hands-on expertise in aluminium fabrication and interior execution. He ensures every installation is delivered on time, within budget, and to the highest standards of finish.",
    image: "/md.png",
    whatsapp: "94773724849",
    email: "damnaluminiumfabrication@gmail.com"
  }
];

const initialServices: ServiceItem[] = [
  {
    id: 'svc-1',
    title: 'Aluminium Doors & Windows',
    tagline: 'Open up with style',
    features: ['Strong & Stylish', 'Fully Recyclable', 'Customizable', 'Weather Resistant'],
    iconName: 'Wind',
  },
  {
    id: 'svc-2',
    title: 'Modern Kitchen Cabinets',
    tagline: 'Make your dream kitchen',
    features: ['Soft-close Door', 'Modern Design', 'Hygienic & Safe', 'Waterproof Body'],
    iconName: 'Box',
  },
  {
    id: 'svc-3',
    title: 'Tempered Glass Works',
    tagline: 'Strength meets elegance',
    features: ['10mm & 12mm Glass', 'Strong & Safe', 'Rust Free', 'Crystal Clear Finish'],
    iconName: 'Sparkles',
  },
  {
    id: 'svc-4',
    title: 'Aluminium Partition',
    tagline: 'Shape your dream space',
    features: ['Strong & Stylish', 'Fully Recyclable', 'Lightweight', 'Fire-resistant'],
    iconName: 'Grid',
  },
  {
    id: 'svc-5',
    title: 'ACP Cladding Interior & Exterior',
    tagline: 'Transform walls into modern elegance',
    features: ['Lightweight yet Strong', 'Weather & UV Resistant', 'Modern Sleek Look', 'Long-lasting Color'],
    iconName: 'Package',
  },
  {
    id: 'svc-6',
    title: 'Gypsum & I-Panel Ceiling',
    tagline: 'Elegant style and lasting strength',
    features: ['Sleek Finish', 'Modern Look', 'Easy to Maintain', 'Sound Insulation'],
    iconName: 'Layers',
  },
  {
    id: 'svc-7',
    title: 'Gutter Works',
    tagline: 'Make your roof design complete',
    features: ['Strong Gutter', '10 Years Warranty', 'Skilled Group', 'Korean Union Steel 0.47'],
    iconName: 'Droplet',
  },
  {
    id: 'svc-8',
    title: 'Modern Shop Fittings & Interiors',
    tagline: 'Transform your office or store into a modern masterpiece',
    features: ['Elegant Lights', 'Tech-integrated', 'Custom Design', 'Install & Finishing'],
    iconName: 'LayoutGrid',
  },
  {
    id: 'svc-9',
    title: 'Fluted Wall Panel Decoration',
    tagline: 'Redefine your walls with texture',
    features: ['Elegant Lights', 'Tech-integrated', 'Custom Design', 'Install & Finishing'],
    iconName: 'Hammer',
  }
];

const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    name: 'Luxury Villa Aluminium Doors & Windows',
    category: 'Aluminium Doors & Windows',
    location: 'Colombo, LK',
    budget: 'Premium',
    completionDate: 'November 2025',
    testimonial: 'D-AMN Aluminium Fabrication installed stunning sliding doors and casement windows throughout our villa. The quality is exceptional and the modern look has completely transformed our home.',
    featured: true,
    images: ['/gallery-9.png', '/gallery-11.png']
  },
  {
    id: 'proj-2',
    name: 'Modern Kitchen Cabinet Installation',
    category: 'Kitchen Cabinets',
    location: 'Kandy, LK',
    budget: 'Standard',
    completionDate: 'February 2026',
    testimonial: 'Our new aluminium kitchen cabinets are incredible — completely waterproof, rust-free, and the soft-close doors are a joy to use. Zero maintenance and looks brand new every day!',
    featured: true,
    images: ['/gallery-1.png', '/gallery-2.png']
  },
  {
    id: 'proj-3',
    name: 'Hotel Tempered Glass Railings',
    category: 'Tempered Glass Works',
    location: 'Galle, LK',
    budget: 'Premium',
    completionDate: 'April 2026',
    testimonial: 'D-AMN installed 12mm tempered glass railings with stainless steel fittings across our entire hotel. The crystal clear finish and elegant design have elevated our property beautifully.',
    featured: true,
    images: ['/gallery-10.png', '/gallery-12.png']
  }
];

// Seed initial photos for Sri Lanka locations dynamically
const initialProjectPhotos: ProjectPhotoItem[] = [
  { id: 'amb-01', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_14.34.13.jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Modern Kitchen Installation' },
  { id: 'amb-02', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_14.34.13_(1).jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Kitchen Cabinet Design' },
  { id: 'amb-03', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_14.34.14.jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Premium Kitchen Cabinets' },
  { id: 'ben-01', src: '/projects/Benthota_WhatsApp_Image_2026-06-29_at_15.29.34.jpeg', location: 'Benthota', service: 'Glass', title: 'Tempered Glass Railings' },
  { id: 'ben-02', src: '/projects/Benthota_WhatsApp_Image_2026-06-29_at_15.29.35.jpeg', location: 'Benthota', service: 'Luxury', title: 'Luxury Aluminium Fixtures' },
  { id: 'kal-01', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_14.23.23.jpeg', location: 'Kaluthara', service: 'Ceiling', title: 'Modern Gypsum Ceiling' },
  { id: 'kal-02', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_14.23.24.jpeg', location: 'Kaluthara', service: 'Ceiling', title: 'Designer Gypsum Lights' },
  { id: 'ura-01', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.29.32.jpeg', location: 'Uragasmanhandiya', service: 'Kitchen', title: 'Aluminium Cabinet Setup' }
];

const initialPricing: PricingPackageItem[] = [
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

const initialBlogs: BlogPostItem[] = [
  {
    id: 'post-1',
    title: 'Why Aluminium is the Future of Modern Home Design',
    excerpt: 'Lightweight, durable, and low-maintenance — discover why aluminium is the top choice for contemporary homes in Sri Lanka.',
    content: 'Aluminium has become the material of choice for modern architects and homeowners. Lightweight, durable, and infinitely recyclable — it’s reshaping how we build. At D-AMN Aluminium Fabrication, we combine premium materials with expert craftsmanship to deliver aluminium solutions that stand the test of time.',
    image: '/gallery-9.png',
    category: 'Industry Trends',
    readTime: '5 min read',
    date: 'June 15, 2026',
    status: 'published'
  },
  {
    id: 'post-2',
    title: '10 Modern Kitchen Cabinet Ideas for Small Spaces',
    excerpt: 'Smart pantry cupboard designs and sleek aluminium finishes that maximize storage without sacrificing style.',
    content: 'Modern kitchens in smaller homes need smart storage first, and aluminium pantry cupboards deliver. With slim profiles, built-in organization, and moisture-resistant finishes, these solutions keep kitchens clean, efficient, and elegant.',
    image: '/gallery-1.png',
    category: 'Pantry Cupboards',
    readTime: '6 min read',
    date: 'May 28, 2026',
    status: 'published'
  },
  {
    id: 'post-3',
    title: 'Tempered Glass vs. Regular Glass: What You Need to Know',
    excerpt: 'Compare strength, safety, and style so you can choose the right glass solution for railings, partitions, and shower enclosures.',
    content: 'Tempered glass is stronger, safer, and more durable than regular glass, making it ideal for railings, partitions, and shower cubicles. Learn how 10mm and 12mm options give you both elegance and peace of mind.',
    image: '/gallery-3.png',
    category: 'Glass Works',
    readTime: '4 min read',
    date: 'April 12, 2026',
    status: 'published'
  }
];

const initialContact: ContactDetails = {
  phone: "+94 77 372 4849",
  email: "damnaluminiumfabrication@gmail.com",
  address: "83/2, Zahira Road, Dharga Town, Sri Lanka",
  hours: "Mon-Fri: 8AM-6PM",
  whatsapp: "94773724849"
};

const initialGlobalSettings: GlobalSettingsItem = {
  logoText: "D-AMN",
  logoSubtext: "Aluminium & Glass Fabrication",
  footerCopyright: "D-AMN Aluminium Fabrication. All rights reserved.",
  facebook: "https://www.facebook.com/share/176TCUV9L4/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/damn_aluminum_fabrication?igsh=MWR5amxxbmJjZWpnZg%3D%3D&utm_source=qr",
  tiktok: "https://www.tiktok.com/@d_amn_aluminum?_t=ZS-90bDvAIN9nT&_r=1",
  whatsappLink: "https://wa.me/94773724849?text=Hi%2C%20I'm%20interested%20in%20aluminium%20fabrication%20services",
  googleMaps: "https://maps.app.goo.gl/bidpDxH7mXRbKYWH8?g_st=iw",
  maintenanceMode: false
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // LocalStorage Helpers
  const getStoredValue = <T,>(key: string, defaultValue: T): T => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed !== null && parsed !== undefined) {
          return parsed;
        }
      } catch (e) {
        return defaultValue;
      }
    }
    return defaultValue;
  };

  // State Declarations
  const [heroTitle, setHeroTitleState] = useState(() => getStoredValue('heroTitle', initialHeroTitle));
  const [heroSubtitle, setHeroSubtitleState] = useState(() => getStoredValue('heroSubtitle', initialHeroSubtitle));
  const [heroKeywords, setHeroKeywordsState] = useState(() => getStoredValue('heroKeywords', initialHeroKeywords));

  const [aboutTitle, setAboutTitleState] = useState(() => getStoredValue('aboutTitle', initialAboutTitle));
  const [aboutSubtitle, setAboutSubtitleState] = useState(() => getStoredValue('aboutSubtitle', initialAboutSubtitle));
  const [aboutParagraph, setAboutParagraphState] = useState(() => getStoredValue('aboutParagraph', initialAboutParagraph));
  const [team, setTeamState] = useState(() => getStoredValue('team', initialTeam));

  const [servicesList, setServicesListState] = useState(() => getStoredValue('servicesList', initialServices));
  
  const [projectsList, setProjectsListState] = useState(() => getStoredValue('projectsList', initialProjects));
  const [projectPhotosList, setProjectPhotosListState] = useState(() => getStoredValue('projectPhotosList', initialProjectPhotos));

  const [pricingList, setPricingListState] = useState(() => getStoredValue('pricingList', initialPricing));
  const [blogsList, setBlogsListState] = useState(() => getStoredValue('blogsList', initialBlogs));
  
  const [contact, setContactState] = useState(() => getStoredValue('contact', initialContact));
  const [submissionsList, setSubmissionsListState] = useState(() => getStoredValue<FormSubmission[]>('submissionsList', []));
  const [globalSettings, setGlobalSettingsState] = useState(() => getStoredValue('globalSettings', initialGlobalSettings));
  const [dashboardStatsOverrides, setDashboardStatsOverridesState] = useState(() => getStoredValue('dashboardStatsOverrides', { totalProjects: '100+', blogPosts: '', pendingEnquiries: '', activeServices: '' }));

  // Sync to LocalStorage on state changes
  useEffect(() => {
    localStorage.setItem('heroTitle', JSON.stringify(heroTitle));
  }, [heroTitle]);
  useEffect(() => {
    localStorage.setItem('heroSubtitle', JSON.stringify(heroSubtitle));
  }, [heroSubtitle]);
  useEffect(() => {
    localStorage.setItem('heroKeywords', JSON.stringify(heroKeywords));
  }, [heroKeywords]);

  useEffect(() => {
    localStorage.setItem('aboutTitle', JSON.stringify(aboutTitle));
  }, [aboutTitle]);
  useEffect(() => {
    localStorage.setItem('aboutSubtitle', JSON.stringify(aboutSubtitle));
  }, [aboutSubtitle]);
  useEffect(() => {
    localStorage.setItem('aboutParagraph', JSON.stringify(aboutParagraph));
  }, [aboutParagraph]);
  useEffect(() => {
    localStorage.setItem('team', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('servicesList', JSON.stringify(servicesList));
  }, [servicesList]);

  useEffect(() => {
    localStorage.setItem('projectsList', JSON.stringify(projectsList));
  }, [projectsList]);
  useEffect(() => {
    localStorage.setItem('projectPhotosList', JSON.stringify(projectPhotosList));
  }, [projectPhotosList]);

  useEffect(() => {
    localStorage.setItem('pricingList', JSON.stringify(pricingList));
  }, [pricingList]);
  useEffect(() => {
    localStorage.setItem('blogsList', JSON.stringify(blogsList));
  }, [blogsList]);

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contact));
  }, [contact]);
  useEffect(() => {
    localStorage.setItem('submissionsList', JSON.stringify(submissionsList));
  }, [submissionsList]);
  useEffect(() => {
    localStorage.setItem('globalSettings', JSON.stringify(globalSettings));
  }, [globalSettings]);
  useEffect(() => {
    localStorage.setItem('dashboardStatsOverrides', JSON.stringify(dashboardStatsOverrides));
  }, [dashboardStatsOverrides]);

  // Setters wrapped in state sync helpers
  const setHeroTitle = (v: string) => setHeroTitleState(v);
  const setHeroSubtitle = (v: string) => setHeroSubtitleState(v);
  const setHeroKeywords = (v: string[]) => setHeroKeywordsState(v);

  const setAboutTitle = (v: string) => setAboutTitleState(v);
  const setAboutSubtitle = (v: string) => setAboutSubtitleState(v);
  const setAboutParagraph = (v: string) => setAboutParagraphState(v);
  const setTeam = (v: TeamMember[]) => setTeamState(v);

  const setServicesList = (v: ServiceItem[]) => setServicesListState(v);
  const setProjectsList = (v: ProjectItem[]) => setProjectsListState(v);
  const setProjectPhotosList = (v: ProjectPhotoItem[]) => setProjectPhotosListState(v);

  const setPricingList = (v: PricingPackageItem[]) => setPricingListState(v);
  const setBlogsList = (v: BlogPostItem[]) => setBlogsListState(v);

  const setContact = (v: ContactDetails) => setContactState(v);
  const setSubmissionsList = (v: FormSubmission[]) => setSubmissionsListState(v);
  const setGlobalSettings = (v: GlobalSettingsItem) => setGlobalSettingsState(v);
  const setDashboardStatsOverrides = (v: any) => setDashboardStatsOverridesState(v);

  const addSubmission = (sub: Omit<FormSubmission, 'id' | 'date' | 'read'>) => {
    const newSub: FormSubmission = {
      ...sub,
      id: `sub-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      read: false
    };
    setSubmissionsListState((prev) => [newSub, ...prev]);
  };

  const resetAllData = () => {
    setHeroTitleState(initialHeroTitle);
    setHeroSubtitleState(initialHeroSubtitle);
    setHeroKeywordsState(initialHeroKeywords);
    setAboutTitleState(initialAboutTitle);
    setAboutSubtitleState(initialAboutSubtitle);
    setAboutParagraphState(initialAboutParagraph);
    setTeamState(initialTeam);
    setServicesListState(initialServices);
    setProjectsListState(initialProjects);
    setProjectPhotosListState(initialProjectPhotos);
    setPricingListState(initialPricing);
    setBlogsListState(initialBlogs);
    setContactState(initialContact);
    setSubmissionsListState([]);
    setGlobalSettingsState(initialGlobalSettings);
    setDashboardStatsOverridesState({ totalProjects: '100+', blogPosts: '', pendingEnquiries: '', activeServices: '' });
    localStorage.clear();
  };

  return (
    <DataContext.Provider value={{
      heroTitle, heroSubtitle, heroKeywords, setHeroTitle, setHeroSubtitle, setHeroKeywords,
      aboutTitle, aboutSubtitle, aboutParagraph, team, setAboutTitle, setAboutSubtitle, setAboutParagraph, setTeam,
      servicesList, setServicesList,
      projectsList, projectPhotosList, setProjectsList, setProjectPhotosList,
      pricingList, setPricingList,
      blogsList, setBlogsList,
      contact, setContact,
      submissionsList, setSubmissionsList, addSubmission,
      globalSettings, setGlobalSettings,
      dashboardStatsOverrides, setDashboardStatsOverrides,
      resetAllData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
