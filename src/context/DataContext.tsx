import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';


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

  // API sync helpers
  apiSynced: boolean;
  saveToAPI: () => Promise<void>;
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
    name: "Mohamed Nowful",
    role: "Founder & CEO",
    bio: "Visionary founder behind D-AMN Aluminium Fabrication with 20+ years of hands-on experience in aluminium fabrication and interior solutions. Nowful leads the company with deep industry expertise, a passion for modern design, and an unwavering commitment to quality craftsmanship. From concept to completion, he ensures every project reflects durability, innovation, and timeless style.",
    image: "/founder.png",
    whatsapp: "94773724849",
    email: "damnaluminiumfabrication@gmail.com",
    badge: "20+ Years Experience"
  },
  {
    name: "Abdul Maajidh",
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
  { id: 'amb-000', src: '/projects/Ambalangoda_2_WhatsApp_Image_2026-06-29_at_14.45.01.jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'amb-001', src: '/projects/Ambalangoda_2_WhatsApp_Image_2026-06-29_at_14.45.31.jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'amb-002', src: '/projects/Ambalangoda_2_WhatsApp_Image_2026-06-29_at_14.45.31_(1).jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'amb-003', src: '/projects/Ambalangoda_2_WhatsApp_Image_2026-06-29_at_14.45.32.jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'amb-004', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_14.34.13.jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'amb-005', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_14.34.13_(1).jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'amb-006', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_14.34.14.jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'amb-007', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.30.jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'amb-008', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.30_(1).jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'amb-009', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.31.jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'amb-010', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.31_(1).jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'amb-011', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.31_(2).jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'amb-012', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.31_(3).jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'amb-013', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.54.jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'amb-014', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.54_(1).jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'amb-015', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.55.jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'amb-016', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.55_(1).jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'ban-017', src: '/projects/Bandarawala_WhatsApp_Image_2026-06-29_at_16.07.13.jpeg', location: 'Bandarawala', service: 'Fabrication', title: 'Bandarawala Project' },
  { id: 'ban-018', src: '/projects/Bandarawala_WhatsApp_Image_2026-06-29_at_16.07.14.jpeg', location: 'Bandarawala', service: 'Fabrication', title: 'Bandarawala Project' },
  { id: 'ban-019', src: '/projects/Bandarawala_WhatsApp_Image_2026-06-29_at_16.07.14_(1).jpeg', location: 'Bandarawala', service: 'Fabrication', title: 'Bandarawala Project' },
  { id: 'ban-020', src: '/projects/Bandarawala_WhatsApp_Image_2026-06-29_at_16.07.14_(2).jpeg', location: 'Bandarawala', service: 'Fabrication', title: 'Bandarawala Project' },
  { id: 'ban-021', src: '/projects/Bandarawala_WhatsApp_Image_2026-06-29_at_16.07.15.jpeg', location: 'Bandarawala', service: 'Fabrication', title: 'Bandarawala Project' },
  { id: 'ban-022', src: '/projects/Bandarawala_WhatsApp_Image_2026-06-29_at_16.07.15_(1).jpeg', location: 'Bandarawala', service: 'Fabrication', title: 'Bandarawala Project' },
  { id: 'ban-023', src: '/projects/Bandarawala_WhatsApp_Image_2026-06-29_at_16.07.16.jpeg', location: 'Bandarawala', service: 'Fabrication', title: 'Bandarawala Project' },
  { id: 'ban-024', src: '/projects/Bandarawala_WhatsApp_Image_2026-06-29_at_16.07.17.jpeg', location: 'Bandarawala', service: 'Fabrication', title: 'Bandarawala Project' },
  { id: 'ben-025', src: '/projects/Benthota_WhatsApp_Image_2026-06-29_at_15.29.34.jpeg', location: 'Benthota', service: 'Fabrication', title: 'Benthota Project' },
  { id: 'ben-026', src: '/projects/Benthota_WhatsApp_Image_2026-06-29_at_15.29.35.jpeg', location: 'Benthota', service: 'Fabrication', title: 'Benthota Project' },
  { id: 'ben-027', src: '/projects/Benthota_WhatsApp_Image_2026-06-29_at_15.29.35_(1).jpeg', location: 'Benthota', service: 'Fabrication', title: 'Benthota Project' },
  { id: 'ben-028', src: '/projects/Benthota_WhatsApp_Image_2026-06-29_at_15.36.33.jpeg', location: 'Benthota', service: 'Fabrication', title: 'Benthota Project' },
  { id: 'ben-029', src: '/projects/Benthota_WhatsApp_Image_2026-06-29_at_15.36.54.jpeg', location: 'Benthota', service: 'Fabrication', title: 'Benthota Project' },
  { id: 'deh-030', src: '/projects/Dehiwela_WhatsApp_Image_2026-06-29_at_15.36.05.jpeg', location: 'Dehiwela', service: 'Fabrication', title: 'Dehiwela Project' },
  { id: 'deh-031', src: '/projects/Dehiwela_WhatsApp_Image_2026-06-29_at_15.36.06.jpeg', location: 'Dehiwela', service: 'Fabrication', title: 'Dehiwela Project' },
  { id: 'deh-032', src: '/projects/Dehiwela_WhatsApp_Image_2026-06-29_at_15.36.06_(1).jpeg', location: 'Dehiwela', service: 'Fabrication', title: 'Dehiwela Project' },
  { id: 'deh-033', src: '/projects/Dehiwela_WhatsApp_Image_2026-06-29_at_15.36.07.jpeg', location: 'Dehiwela', service: 'Fabrication', title: 'Dehiwela Project' },
  { id: 'deh-034', src: '/projects/Dehiwela_WhatsApp_Image_2026-06-29_at_15.36.07_(1).jpeg', location: 'Dehiwela', service: 'Fabrication', title: 'Dehiwela Project' },
  { id: 'dha-035', src: '/projects/Dhargatown_WhatsApp_Image_2026-06-29_at_16.06.22.jpeg', location: 'Dhargatown', service: 'Fabrication', title: 'Dhargatown Project' },
  { id: 'dha-036', src: '/projects/Dhargatown_WhatsApp_Image_2026-06-29_at_16.06.22_(1).jpeg', location: 'Dhargatown', service: 'Fabrication', title: 'Dhargatown Project' },
  { id: 'dha-037', src: '/projects/Dhargatown_WhatsApp_Image_2026-06-29_at_16.06.23.jpeg', location: 'Dhargatown', service: 'Fabrication', title: 'Dhargatown Project' },
  { id: 'dha-038', src: '/projects/Dhargatown_WhatsApp_Image_2026-06-29_at_16.06.23_(1).jpeg', location: 'Dhargatown', service: 'Fabrication', title: 'Dhargatown Project' },
  { id: 'dha-039', src: '/projects/Dhargatown_WhatsApp_Image_2026-06-29_at_16.06.23_(2).jpeg', location: 'Dhargatown', service: 'Fabrication', title: 'Dhargatown Project' },
  { id: 'dha-040', src: '/projects/Dhargatown_WhatsApp_Image_2026-06-29_at_16.06.24.jpeg', location: 'Dhargatown', service: 'Fabrication', title: 'Dhargatown Project' },
  { id: 'dod-041', src: '/projects/Dodangoda_WhatsApp_Image_2026-06-29_at_14.29.55.jpeg', location: 'Dodangoda', service: 'Fabrication', title: 'Dodangoda Project' },
  { id: 'dod-042', src: '/projects/Dodangoda_WhatsApp_Image_2026-06-29_at_14.30.42.jpeg', location: 'Dodangoda', service: 'Fabrication', title: 'Dodangoda Project' },
  { id: 'dod-043', src: '/projects/Dodangoda_WhatsApp_Image_2026-06-29_at_14.30.42_(1).jpeg', location: 'Dodangoda', service: 'Fabrication', title: 'Dodangoda Project' },
  { id: 'dod-044', src: '/projects/Dodangoda_WhatsApp_Image_2026-06-29_at_14.30.42_(2).jpeg', location: 'Dodangoda', service: 'Fabrication', title: 'Dodangoda Project' },
  { id: 'elp-045', src: '/projects/Elpitiya_WhatsApp_Image_2026-06-29_at_16.07.44.jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'elp-046', src: '/projects/Elpitiya_WhatsApp_Image_2026-06-29_at_16.07.44_(1).jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'elp-047', src: '/projects/Elpitiya_WhatsApp_Image_2026-06-29_at_16.07.45.jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'elp-048', src: '/projects/Elpitiya_WhatsApp_Image_2026-06-29_at_16.07.45_(1).jpeg', location: 'Elpitiya', service: 'Fabrication', title: 'Elpitiya Project' },
  { id: 'hor-049', src: '/projects/Horana_WhatsApp_Image_2026-06-29_at_14.36.30.jpeg', location: 'Horana', service: 'Fabrication', title: 'Horana Project' },
  { id: 'hor-050', src: '/projects/Horana_WhatsApp_Image_2026-06-29_at_14.48.45.jpeg', location: 'Horana', service: 'Fabrication', title: 'Horana Project' },
  { id: 'hor-051', src: '/projects/Horana_WhatsApp_Image_2026-06-29_at_14.48.49.jpeg', location: 'Horana', service: 'Fabrication', title: 'Horana Project' },
  { id: 'hor-052', src: '/projects/Horana_WhatsApp_Image_2026-06-29_at_14.48.49_(1).jpeg', location: 'Horana', service: 'Fabrication', title: 'Horana Project' },
  { id: 'kal-053', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_14.23.23.jpeg', location: 'Kaluthara', service: 'Fabrication', title: 'Kaluthara Project' },
  { id: 'kal-054', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_14.23.24.jpeg', location: 'Kaluthara', service: 'Fabrication', title: 'Kaluthara Project' },
  { id: 'kal-055', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_14.23.25.jpeg', location: 'Kaluthara', service: 'Fabrication', title: 'Kaluthara Project' },
  { id: 'kal-056', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_14.26.50.jpeg', location: 'Kaluthara', service: 'Fabrication', title: 'Kaluthara Project' },
  { id: 'kal-057', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_14.26.50_(1).jpeg', location: 'Kaluthara', service: 'Fabrication', title: 'Kaluthara Project' },
  { id: 'kal-058', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_16.08.29.jpeg', location: 'Kaluthara', service: 'Fabrication', title: 'Kaluthara Project' },
  { id: 'kal-059', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_16.08.29_(1).jpeg', location: 'Kaluthara', service: 'Fabrication', title: 'Kaluthara Project' },
  { id: 'kal-060', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_16.08.29_(2).jpeg', location: 'Kaluthara', service: 'Fabrication', title: 'Kaluthara Project' },
  { id: 'kal-061', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_16.08.30.jpeg', location: 'Kaluthara', service: 'Fabrication', title: 'Kaluthara Project' },
  { id: 'kan-062', src: '/projects/Kande_vihara_WhatsApp_Image_2026-06-29_at_15.23.48.jpeg', location: 'Kande', service: 'Fabrication', title: 'Kande Project' },
  { id: 'kan-063', src: '/projects/Kande_vihara_WhatsApp_Image_2026-06-29_at_15.27.31.jpeg', location: 'Kande', service: 'Fabrication', title: 'Kande Project' },
  { id: 'kan-064', src: '/projects/Kande_vihara_WhatsApp_Image_2026-06-29_at_15.27.39.jpeg', location: 'Kande', service: 'Fabrication', title: 'Kande Project' },
  { id: 'kan-065', src: '/projects/Kande_vihara_WhatsApp_Image_2026-06-29_at_15.36.08.jpeg', location: 'Kande', service: 'Fabrication', title: 'Kande Project' },
  { id: 'kan-066', src: '/projects/Kande_vihara_WhatsApp_Image_2026-06-29_at_15.36.08_(1).jpeg', location: 'Kande', service: 'Fabrication', title: 'Kande Project' },
  { id: 'kan-067', src: '/projects/Kande_vihara_WhatsApp_Image_2026-06-29_at_15.36.08_(2).jpeg', location: 'Kande', service: 'Fabrication', title: 'Kande Project' },
  { id: 'kar-068', src: '/projects/Karandeniya_WhatsApp_Image_2026-06-29_at_16.03.46.jpeg', location: 'Karandeniya', service: 'Fabrication', title: 'Karandeniya Project' },
  { id: 'kar-069', src: '/projects/Karandeniya_WhatsApp_Image_2026-06-29_at_16.04.13.jpeg', location: 'Karandeniya', service: 'Fabrication', title: 'Karandeniya Project' },
  { id: 'kar-070', src: '/projects/Karandeniya_WhatsApp_Image_2026-06-29_at_16.04.13_(1).jpeg', location: 'Karandeniya', service: 'Fabrication', title: 'Karandeniya Project' },
  { id: 'kar-071', src: '/projects/Karandeniya_WhatsApp_Image_2026-06-29_at_16.04.13_(2).jpeg', location: 'Karandeniya', service: 'Fabrication', title: 'Karandeniya Project' },
  { id: 'kel-072', src: '/projects/Kelaniya_WhatsApp_Image_2026-06-29_at_15.36.01.jpeg', location: 'Kelaniya', service: 'Fabrication', title: 'Kelaniya Project' },
  { id: 'kel-073', src: '/projects/Kelaniya_WhatsApp_Image_2026-06-29_at_15.36.01_(1).jpeg', location: 'Kelaniya', service: 'Fabrication', title: 'Kelaniya Project' },
  { id: 'kel-074', src: '/projects/Kelaniya_WhatsApp_Image_2026-06-29_at_15.36.01_(2).jpeg', location: 'Kelaniya', service: 'Fabrication', title: 'Kelaniya Project' },
  { id: 'mar-075', src: '/projects/Mariyam_gold,_Beruwela_WhatsApp_Image_2026-06-29_at_16.05.39.jpeg', location: 'Mariyam', service: 'Fabrication', title: 'Mariyam Project' },
  { id: 'mar-076', src: '/projects/Mariyam_gold,_Beruwela_WhatsApp_Image_2026-06-29_at_16.05.40.jpeg', location: 'Mariyam', service: 'Fabrication', title: 'Mariyam Project' },
  { id: 'mar-077', src: '/projects/Mariyam_gold,_Beruwela_WhatsApp_Image_2026-06-29_at_16.05.40_(1).jpeg', location: 'Mariyam', service: 'Fabrication', title: 'Mariyam Project' },
  { id: 'mar-078', src: '/projects/Mariyam_gold,_Beruwela_WhatsApp_Image_2026-06-29_at_16.05.41.jpeg', location: 'Mariyam', service: 'Fabrication', title: 'Mariyam Project' },
  { id: 'mat-079', src: '/projects/Mathugama_WhatsApp_Image_2026-06-29_at_16.04.48.jpeg', location: 'Mathugama', service: 'Fabrication', title: 'Mathugama Project' },
  { id: 'mat-080', src: '/projects/Mathugama_WhatsApp_Image_2026-06-29_at_16.05.07.jpeg', location: 'Mathugama', service: 'Fabrication', title: 'Mathugama Project' },
  { id: 'mat-081', src: '/projects/Mathugama_WhatsApp_Image_2026-06-29_at_16.05.08.jpeg', location: 'Mathugama', service: 'Fabrication', title: 'Mathugama Project' },
  { id: 'pah-082', src: '/projects/Pahekanuwa_PahekanuwaWhatsApp_Image_2026-06-29_at_14.21.43.jpeg', location: 'Pahekanuwa', service: 'Fabrication', title: 'Pahekanuwa Project' },
  { id: 'pah-083', src: '/projects/Pahekanuwa_PahekanuwaWhatsApp_Image_2026-06-29_at_14.21.43_(1).jpeg', location: 'Pahekanuwa', service: 'Fabrication', title: 'Pahekanuwa Project' },
  { id: 'pah-084', src: '/projects/Pahekanuwa_PahekanuwaWhatsApp_Image_2026-06-29_at_14.21.43_(2).jpeg', location: 'Pahekanuwa', service: 'Fabrication', title: 'Pahekanuwa Project' },
  { id: 'pah-085', src: '/projects/Pahekanuwa_PahekanuwaWhatsApp_Image_2026-06-29_at_14.21.44.jpeg', location: 'Pahekanuwa', service: 'Fabrication', title: 'Pahekanuwa Project' },
  { id: 'pah-086', src: '/projects/Pahekanuwa_PahekanuwaWhatsApp_Image_2026-06-29_at_14.21.44_(1).jpeg', location: 'Pahekanuwa', service: 'Fabrication', title: 'Pahekanuwa Project' },
  { id: 'pel-087', src: '/projects/Pelawatta_WhatsApp_Image_2026-06-29_at_16.05.59.jpeg', location: 'Pelawatta', service: 'Fabrication', title: 'Pelawatta Project' },
  { id: 'pel-088', src: '/projects/Pelawatta_WhatsApp_Image_2026-06-29_at_16.05.59_(1).jpeg', location: 'Pelawatta', service: 'Fabrication', title: 'Pelawatta Project' },
  { id: 'pel-089', src: '/projects/Pelawatta_WhatsApp_Image_2026-06-29_at_16.05.59_(2).jpeg', location: 'Pelawatta', service: 'Fabrication', title: 'Pelawatta Project' },
  { id: 'pol-090', src: '/projects/Polgahawela_WhatsApp_Image_2026-06-29_at_16.19.46.jpeg', location: 'Polgahawela', service: 'Fabrication', title: 'Polgahawela Project' },
  { id: 'pol-091', src: '/projects/Polgahawela_WhatsApp_Image_2026-06-29_at_16.19.47.jpeg', location: 'Polgahawela', service: 'Fabrication', title: 'Polgahawela Project' },
  { id: 'pol-092', src: '/projects/Polgahawela_WhatsApp_Image_2026-06-29_at_16.19.47_(1).jpeg', location: 'Polgahawela', service: 'Fabrication', title: 'Polgahawela Project' },
  { id: 'pol-093', src: '/projects/Polgahawela_WhatsApp_Image_2026-06-29_at_16.19.48.jpeg', location: 'Polgahawela', service: 'Fabrication', title: 'Polgahawela Project' },
  { id: 'pol-094', src: '/projects/Polgahawela_WhatsApp_Image_2026-06-29_at_16.19.48_(1).jpeg', location: 'Polgahawela', service: 'Fabrication', title: 'Polgahawela Project' },
  { id: 'ura-095', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.29.32.jpeg', location: 'Uragasmanhandiya', service: 'Fabrication', title: 'Uragasmanhandiya Project' },
  { id: 'ura-096', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.29.32_(1).jpeg', location: 'Uragasmanhandiya', service: 'Fabrication', title: 'Uragasmanhandiya Project' },
  { id: 'ura-097', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.09.jpeg', location: 'Uragasmanhandiya', service: 'Fabrication', title: 'Uragasmanhandiya Project' },
  { id: 'ura-098', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.11.jpeg', location: 'Uragasmanhandiya', service: 'Fabrication', title: 'Uragasmanhandiya Project' },
  { id: 'ura-099', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.12.jpeg', location: 'Uragasmanhandiya', service: 'Fabrication', title: 'Uragasmanhandiya Project' },
  { id: 'ura-100', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.12_2.jpeg', location: 'Uragasmanhandiya', service: 'Fabrication', title: 'Uragasmanhandiya Project' },
  { id: 'ura-101', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.13.jpeg', location: 'Uragasmanhandiya', service: 'Fabrication', title: 'Uragasmanhandiya Project' },
  { id: 'ura-102', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.56.jpeg', location: 'Uragasmanhandiya', service: 'Fabrication', title: 'Uragasmanhandiya Project' },
  { id: 'ura-103', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.57.jpeg', location: 'Uragasmanhandiya', service: 'Fabrication', title: 'Uragasmanhandiya Project' },
  { id: 'ura-104', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.57_(1).jpeg', location: 'Uragasmanhandiya', service: 'Fabrication', title: 'Uragasmanhandiya Project' },
  { id: 'ura-105', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.58.jpeg', location: 'Uragasmanhandiya', service: 'Fabrication', title: 'Uragasmanhandiya Project' },
  { id: 'ura-106', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.58_(1).jpeg', location: 'Uragasmanhandiya', service: 'Fabrication', title: 'Uragasmanhandiya Project' },
  { id: 'ura-107', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_16.01.55.jpeg', location: 'Uragasmanhandiya', service: 'Fabrication', title: 'Uragasmanhandiya Project' },
  { id: 'ura-108', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_16.01.56.jpeg', location: 'Uragasmanhandiya', service: 'Fabrication', title: 'Uragasmanhandiya Project' },
  { id: 'ura-109', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_16.01.56_(1).jpeg', location: 'Uragasmanhandiya', service: 'Fabrication', title: 'Uragasmanhandiya Project' },
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
  const [apiSynced, setApiSynced] = useState(false);

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
  
  // Force team data to always load the latest initialTeam so you don't have to manually clear your cache
  const [team, setTeamState] = useState(initialTeam);

  const [servicesList, setServicesListState] = useState(() => getStoredValue('servicesList', initialServices));
  
  const [projectsList, setProjectsListState] = useState(() => getStoredValue('projectsList', initialProjects));
  const [projectPhotosList, setProjectPhotosListState] = useState(initialProjectPhotos);

  const [pricingList, setPricingListState] = useState(() => getStoredValue('pricingList', initialPricing));
  const [blogsList, setBlogsListState] = useState(() => getStoredValue('blogsList', initialBlogs));
  
  const [contact, setContactState] = useState(() => getStoredValue('contact', initialContact));
  const [submissionsList, setSubmissionsListState] = useState(() => getStoredValue<FormSubmission[]>('submissionsList', []));
  const [globalSettings, setGlobalSettingsState] = useState(() => getStoredValue('globalSettings', initialGlobalSettings));
  const [dashboardStatsOverrides, setDashboardStatsOverridesState] = useState(() => getStoredValue('dashboardStatsOverrides', { totalProjects: '100+', blogPosts: '', pendingEnquiries: '', activeServices: '' }));

  // ─── Load from backend API on mount ─────────────────────────────────────
  useEffect(() => {
    const loadFromAPI = async () => {
      try {
        // 90s timeout: Railway free tier can take 50+ seconds to wake from sleep
        const res = await fetch(`${API_BASE}/api/settings`, { signal: AbortSignal.timeout(90000) });
        if (!res.ok) return;
        const json = await res.json();
        const d = json.data;
        if (!d || Object.keys(d).length === 0) return;
        // Apply all fetched settings to state
        if (d.heroTitle) setHeroTitleState(d.heroTitle);
        if (d.heroSubtitle) setHeroSubtitleState(d.heroSubtitle);
        if (d.heroKeywords) setHeroKeywordsState(d.heroKeywords);
        if (d.aboutTitle) setAboutTitleState(d.aboutTitle);
        if (d.aboutSubtitle) setAboutSubtitleState(d.aboutSubtitle);
        if (d.aboutParagraph) setAboutParagraphState(d.aboutParagraph);
        if (d.team) setTeamState(d.team);
        if (d.servicesList) setServicesListState(d.servicesList);
        if (d.projectsList) setProjectsListState(d.projectsList);
        if (d.projectPhotosList) setProjectPhotosListState(d.projectPhotosList);
        if (d.pricingList) setPricingListState(d.pricingList);
        if (d.blogsList) setBlogsListState(d.blogsList);
        if (d.contact) setContactState(d.contact);
        if (d.globalSettings) setGlobalSettingsState(d.globalSettings);
        if (d.dashboardStatsOverrides) setDashboardStatsOverridesState(d.dashboardStatsOverrides);
        setApiSynced(true);
      } catch {
        // Backend offline — use localStorage/defaults (already loaded)
      }
    };
    loadFromAPI();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  // ─── Save all current state to backend API ────────────────────────────────
  const saveToAPI = useCallback(async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;
    const payload = {
      heroTitle, heroSubtitle, heroKeywords,
      aboutTitle, aboutSubtitle, aboutParagraph, team,
      servicesList, projectsList, projectPhotosList,
      pricingList, blogsList, contact, globalSettings, dashboardStatsOverrides,
    };
    try {
      await fetch(`${API_BASE}/api/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ data: payload }),
        signal: AbortSignal.timeout(8000),
      });
    } catch {
      // Silently fail — localStorage already saved locally
    }
  }, [heroTitle, heroSubtitle, heroKeywords, aboutTitle, aboutSubtitle, aboutParagraph, team, servicesList, projectsList, projectPhotosList, pricingList, blogsList, contact, globalSettings, dashboardStatsOverrides]);

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
      resetAllData,
      apiSynced, saveToAPI,
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
