import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Blog: React.FC = () => {
  const { blogsList } = useData();
  const publishedPosts = blogsList.filter(p => p.status === 'published');

  return (
    <div className="pt-20">
      <section className="py-24 bg-primary dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Design Inspiration</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Trends, tips, and insights from our design experts
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-warm-gray dark:bg-dark-card rounded-2xl overflow-hidden"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#C9A227] text-black text-xs font-bold rounded-full">{post.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-4">
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" />{post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-primary dark:text-white mb-2 group-hover:text-accent transition-colors">{post.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="inline-flex items-center text-accent text-sm font-medium hover:underline">
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
