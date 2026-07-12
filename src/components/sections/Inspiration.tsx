import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { blogPosts } from '../../data/blog';
import { ArrowRight, Clock, CheckCircle2, X } from 'lucide-react';

const galleryItems = [
  {
    id: 'insp-1',
    src: '/gallery-1.png',
    title: 'Pantry Cabinet Transformation',
    category: 'Kitchen',
  },
  {
    id: 'insp-2',
    src: '/gallery-2.png',
    title: 'Space-Saving Kitchen Cabinets',
    category: 'Kitchen',
  },
  {
    id: 'insp-3',
    src: '/gallery-3.png',
    title: 'Tempered Glass Elegance',
    category: 'Glass Works',
  },
  {
    id: 'insp-4',
    src: '/gallery-4.png',
    title: 'Aluminium Window Showcase',
    category: 'Doors & Windows',
  },
  {
    id: 'insp-5',
    src: '/gallery-5.png',
    title: 'Modern Aluminium Partition',
    category: 'Partitions',
  },
  {
    id: 'insp-6',
    src: '/gallery-6.png',
    title: 'Bold Aluminium Cladding',
    category: 'Cladding',
  },
  {
    id: 'insp-7',
    src: '/gallery-7.png',
    title: 'Glass Folding Wall',
    category: 'Glass Works',
  },
  {
    id: 'insp-8',
    src: '/gallery-10.png',
    title: 'Ceiling & Window Contrast',
    category: 'Ceiling',
  },
  {
    id: 'insp-9',
    src: '/gallery-11.png',
    title: 'Large Aluminium Door Wall',
    category: 'Doors & Windows',
  },
];

export const Inspiration: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="blog" className="py-20 md:py-32 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Blog & Trends"
          subtitle="Design Inspiration"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-slate-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
<img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

              </div>
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center px-5 py-3 bg-amber-500 text-slate-950 font-semibold rounded-full hover:bg-amber-400 transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-500 font-semibold mb-3">Design Gallery</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Explore our latest projects</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Kitchen', 'Glass Works', 'Ceiling', 'Doors & Windows', 'Partitions', 'Cladding'].map((category) => (
                <span key={category} className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] bg-slate-100 text-slate-700 rounded-full">
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="columns-1 sm:columns-2 xl:columns-3 gap-4 space-y-4">
            {galleryItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => setSelectedImage(item.src)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="w-full break-inside-avoid rounded-3xl overflow-hidden bg-slate-100 shadow-lg hover:shadow-2xl focus:outline-none"
              >
                <div className="relative overflow-hidden">
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">

                    <h4 className="mt-3 text-lg font-semibold text-white">{item.title}</h4>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-10 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-400 font-semibold mb-3">Get Design Tips & Trends</p>
              <h3 className="text-3xl font-semibold mb-3">Subscribe for the latest inspiration</h3>
              <p className="text-slate-300 leading-relaxed">Join our newsletter for design ideas, product updates, and exclusive D-AMN inspiration delivered straight to your inbox.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-amber-500 px-6 py-4 text-sm font-semibold text-slate-950 hover:bg-amber-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 rounded-full bg-slate-900/90 p-3 text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              src={selectedImage}
              alt="Gallery preview"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="max-h-[90vh] max-w-full rounded-3xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
