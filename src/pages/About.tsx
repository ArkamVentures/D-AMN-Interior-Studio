import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { teamMembers } from '../data/team';
import { Award, Users, Target, Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  { icon: Award, title: 'Excellence', description: 'We pursue perfection in every detail.' },
  { icon: Users, title: 'Collaboration', description: 'Your vision drives our design.' },
  { icon: Target, title: 'Precision', description: 'Engineering-grade accuracy.' },
  { icon: Lightbulb, title: 'Innovation', description: 'Cutting-edge design solutions.' },
];

export const About: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="relative py-24 bg-primary dark:bg-dark-bg">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
            About Celine Interior
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transforming spaces into timeless luxury since 2010
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-32 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80"
                alt="Our Studio"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold text-primary dark:text-white mb-6">
                A Legacy of Design Excellence
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Founded by Celine Laurent in 2010, Celine Interior began with a simple mission: to make 
                exceptional interior design accessible to everyone. What started as a small boutique studio 
                has evolved into a full-service interior engineering and design firm.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Today, we serve both luxury homeowners and budget-conscious clients, delivering 
                transformative spaces that blend artistry with engineering precision.
              </p>
              <Link
                to="/services"
                className="inline-flex items-center text-accent font-medium hover:underline"
              >
                Explore Our Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-warm-gray dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Core Values" subtitle="What We Believe" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-card p-6 rounded-xl text-center"
              >
                <value.icon className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary dark:text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-32 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Meet Our Team" subtitle="The Experts" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-primary dark:text-white">{member.name}</h3>
                <p className="text-accent text-sm mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
