import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-warm-gray dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="Contact Us"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-serif font-bold text-primary dark:text-white mb-6">
              Book Your Free Site Visit & Quotation Today
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Ready to transform your space with premium aluminium and glass solutions? Reach out for a free site visit and quotation. Best price guaranteed!
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary dark:text-white mb-1">Visit Us</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">83/2, Zahira Road<br />Dharga Town, Sri Lanka</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary dark:text-white mb-1">Call Us</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">+94 77 372 4849</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary dark:text-white mb-1">Facebook</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">D-AMN Aluminium Fabrication</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary dark:text-white mb-1">Business Hours</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Mon - Sat: 8:00 AM - 6:00 PM<br />Sun: By Appointment</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-card p-8 rounded-2xl border border-gray-100 dark:border-white/5 shadow-lg">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">Thank You!</h3>
                  <p className="text-gray-600 dark:text-gray-400">We'll contact you shortly to arrange your free site visit.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-primary dark:text-white mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-primary dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary dark:text-white mb-2">Phone</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-primary dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        placeholder="+94 7X XXX XXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-primary dark:text-white mb-2">Email (Optional)</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-primary dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary dark:text-white mb-2">Service Interest</label>
                      <select
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-primary dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option value="">Select a service</option>
                        <option value="aluminium-doors-windows">Aluminium Doors & Windows</option>
                        <option value="kitchen-cabinets">Modern Kitchen Cabinets</option>
                        <option value="tempered-glass">Tempered Glass Works</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-primary dark:text-white mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-primary dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-4 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors shadow-lg shadow-accent/25"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Book Free Site Visit
                  </button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
