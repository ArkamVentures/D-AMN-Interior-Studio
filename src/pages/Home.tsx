import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Services } from '../components/sections/Services';
import { Portfolio } from '../components/sections/Portfolio';
import { ProjectGallery } from '../components/sections/ProjectGallery';
import { Process } from '../components/sections/Process';
import { Stats } from '../components/sections/Stats';
import { Testimonials } from '../components/sections/Testimonials';
import { Pricing } from '../components/sections/Pricing';
import { Inspiration } from '../components/sections/Inspiration';
import { FAQ } from '../components/sections/FAQ';
import { Contact } from '../components/sections/Contact';
import { Awards } from '../components/sections/Awards';
import { Partners } from '../components/sections/Partners';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Services />
      <Portfolio />
      <ProjectGallery />
      <Process />
      <Testimonials />
      <Pricing />
      <Inspiration />
      <FAQ />
      <Partners />
      <Awards />
      <Contact />
    </>
  );
};
