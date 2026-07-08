export interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  city: string;
  image: string;
  featured?: boolean;
}

export const staticProjectData: Project[] = [
  {
    id: "p1",
    title: "Luxury Villa Full Aluminium Facade",
    location: "Colombo 05",
    category: "Facades",
    city: "Colombo",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
    featured: true
  },
  {
    id: "p2",
    title: "Modern Office Glass Partitions",
    location: "Kandy City Center",
    category: "Partitions",
    city: "Kandy",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p3",
    title: "Minimalist Sliding Doors",
    location: "Galle Fort",
    category: "Doors",
    city: "Galle",
    image: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p4",
    title: "Panoramic Casement Windows",
    location: "Negombo Beach",
    category: "Windows",
    city: "Negombo",
    image: "https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p5",
    title: "Commercial Building Facade",
    location: "Colombo 03",
    category: "Facades",
    city: "Colombo",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p6",
    title: "Frameless Glass Railings",
    location: "Mount Lavinia",
    category: "Railings",
    city: "Colombo",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p7",
    title: "Interior Office Partitions",
    location: "Peradeniya",
    category: "Partitions",
    city: "Kandy",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p8",
    title: "Custom Entry Doors",
    location: "Unawatuna",
    category: "Doors",
    city: "Galle",
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p9",
    title: "Floor-to-Ceiling Windows",
    location: "Katunayake",
    category: "Windows",
    city: "Negombo",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p10",
    title: "Curtain Wall Installation",
    location: "Colombo 01",
    category: "Facades",
    city: "Colombo",
    image: "https://images.unsplash.com/photo-1428366890462-dd4baecf492b?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p11",
    title: "Balcony Glass Railings",
    location: "Hikkaduwa",
    category: "Railings",
    city: "Galle",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p12",
    title: "Soundproof Studio Partitions",
    location: "Rajagiriya",
    category: "Partitions",
    city: "Colombo",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1200"
  }
];
