import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Instagram, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Close mobile menu on page navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-warm-gray dark:bg-dark-bg text-primary dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 dark:bg-dark-bg/70 backdrop-blur-md border-b border-gray-100 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-serif text-xl font-bold tracking-[0.2em] text-primary dark:text-white">
                D-AMN<span className="text-accent">.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-xs font-semibold tracking-widest uppercase transition-colors hover:text-accent ${
                      isActive ? 'text-accent' : 'text-primary/70 dark:text-white/70'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              
              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-primary/70 dark:text-white/70 hover:text-accent"
                aria-label="Toggle Theme"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </nav>

            {/* Mobile Nav Trigger */}
            <div className="flex items-center space-x-4 md:hidden">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-primary/70 dark:text-white/70"
                aria-label="Toggle Theme"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-primary dark:text-white hover:text-accent transition-colors"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-dark-card border-b border-gray-100 dark:border-white/5 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `block py-2 text-sm font-semibold tracking-widest uppercase transition-colors ${
                        isActive ? 'text-accent' : 'text-primary/70 dark:text-white/70'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary dark:bg-dark-card text-white/70 border-t border-white/5 pt-16 pb-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white block mb-4">
                D-AMN<span className="text-accent">.</span>
              </span>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                D-AMN Interior Studio is a premier interior design and aluminium fabrication company dedicated to transforming spaces into modern masterpieces.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-accent transition-colors"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white text-xs uppercase tracking-[0.2em] font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white text-xs uppercase tracking-[0.2em] font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/services" className="hover:text-accent transition-colors">Interior Design</Link></li>
                <li><Link to="/services" className="hover:text-accent transition-colors">Aluminium Fabrication</Link></li>
                <li><Link to="/services" className="hover:text-accent transition-colors">Modern Kitchens</Link></li>
                <li><Link to="/services" className="hover:text-accent transition-colors">Gypsum Ceilings</Link></li>
                <li><Link to="/services" className="hover:text-accent transition-colors">Aluminium Partitions</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white text-xs uppercase tracking-[0.2em] font-semibold mb-4">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-4">
                Subscribe to receive design tips and custom project walkthroughs.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="px-4 py-2 bg-transparent outline-none text-sm text-white focus:border-accent w-full"
                />
                <button
                  type="submit"
                  className="px-4 bg-accent hover:bg-accent-dark text-primary font-semibold transition-colors text-sm"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 text-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} D-AMN Interior Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
