import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Facebook, Phone, MapPin } from 'lucide-react';
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
            <Link to="/" className="flex flex-col justify-center">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.2em] text-primary dark:text-white leading-tight">
                D-AMN<span className="text-accent">.</span>
              </span>
              <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.35em] text-gray-400 dark:text-gray-500 font-light -mt-0.5">
                Aluminium & Glass
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          {/* Brand */}
          <div className="mb-8">
            <span className="font-serif text-3xl sm:text-4xl font-bold tracking-[0.2em] text-white block mb-1">
              D-AMN<span className="text-accent">.</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-gray-500 font-light block">
              Aluminium & Glass Fabrication
            </span>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-center gap-3 mb-10 text-sm text-gray-300">
            <a href="tel:+94773724849" className="flex items-center gap-2 hover:text-accent transition-colors duration-300">
              <Phone className="w-4 h-4 text-accent" />
              +94 77 372 4849
            </a>
            <a href="https://maps.app.goo.gl/bidpDxH7mXRbKYWH8?g_st=iw" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors duration-300">
              <MapPin className="w-4 h-4 text-accent" />
              83/2, Zahira Road, Dharga Town
            </a>
          </div>

          {/* Social Icons */}
          <div className="mb-4">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-6">Follow us for daily inspiration</p>
            <div className="flex justify-center items-center gap-4">
              <a href="https://www.instagram.com/damn_aluminum_fabrication?igsh=MWR5amxxbmJjZWpnZg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:text-[#E1306C] hover:bg-[#E1306C]/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(225,48,108,0.5)] transition-all duration-300" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.facebook.com/share/176TCUV9L4/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:text-[#1877F2] hover:bg-[#1877F2]/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(24,119,242,0.5)] transition-all duration-300" aria-label="Facebook">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.tiktok.com/@d_amn_aluminum?_t=ZS-90bDvAIN9nT&_r=1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:text-white hover:bg-black hover:border hover:border-white/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300" aria-label="TikTok">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              </a>
              <a href="https://chat.whatsapp.com/GhQOcjHwoR1FVgU3ikSXbF" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:text-[#25D366] hover:bg-[#25D366]/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] transition-all duration-300" aria-label="WhatsApp">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </a>
              <a href="https://maps.app.goo.gl/bidpDxH7mXRbKYWH8?g_st=iw" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:text-accent hover:bg-accent/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(201,162,39,0.5)] transition-all duration-300" aria-label="Google Maps">
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 text-xs text-gray-600 w-full">
            <p>&copy; {new Date().getFullYear()} D-AMN Aluminium Fabrication. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
