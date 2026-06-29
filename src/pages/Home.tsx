import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Portfolio } from '../components/sections/Portfolio';
import { ProjectGallery } from '../components/sections/ProjectGallery';
import { Process } from '../components/sections/Process';
import { Stats } from '../components/sections/Stats';
import { Testimonials } from '../components/sections/Testimonials';
import { Pricing } from '../components/sections/Pricing';
import { FAQ } from '../components/sections/FAQ';
import { Contact } from '../components/sections/Contact';
import { Awards } from '../components/sections/Awards';
import { Partners } from '../components/sections/Partners';

export const Home: React.FC = () => {
  const [activeLocation, setActiveLocation] = React.useState('All Locations');

  return (
    <>
      <Hero />
      <Stats />
      <Portfolio onSelectLocation={setActiveLocation} activeLocation={activeLocation} />
      <ProjectGallery activeLocation={activeLocation} setActiveLocation={setActiveLocation} />
      <Process />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Partners />
      <Awards />
      <Contact />
    </>
  );
};
