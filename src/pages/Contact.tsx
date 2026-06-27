import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      <section className="py-24 bg-primary dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Let's discuss your next project
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-serif font-bold text-primary dark:text-white mb-6">Get In Touch</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-accent mt-1" />
                  <div><h4 className="font-semibold text-primary dark:text-white">Address</h4><p className="text-gray-600 dark:text-gray-400 text-sm">123 Design Avenue, Suite 500, New York, NY 10001</p></div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-accent mt-1" />
                  <div><h4 className="font-semibold text-primary dark:text-white">Phone</h4><p className="text-gray-600 dark:text-gray-400 text-sm">+1 (212) 555-1234</p></div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-accent mt-1" />
                  <div><h4 className="font-semibold text-primary dark:text-white">Email</h4><p className="text-gray-600 dark:text-gray-400 text-sm">hello@celineinterior.com</p></div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-accent mt-1" />
                  <div><h4 className="font-semibold text-primary dark:text-white">Hours</h4><p className="text-gray-600 dark:text-gray-400 text-sm">Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</p></div>
                </div>
              </div>
              <a href="https://wa.me/12125551234" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <MessageCircle className="w-5 h-5 mr-2" />Chat on WhatsApp
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <form onSubmit={handleSubmit} className="bg-warm-gray dark:bg-dark-card p-8 rounded-2xl">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">Thank You!</h3>
                    <p className="text-gray-600 dark:text-gray-400">We'll contact you within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-primary dark:text-white mb-2">Name</label>
                        <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent dark:text-white focus:ring-2 focus:ring-accent outline-none" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary dark:text-white mb-2">Email</label>
                        <input type="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent dark:text-white focus:ring-2 focus:ring-accent outline-none" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-primary dark:text-white mb-2">Message</label>
                      <textarea rows={5} required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent dark:text-white focus:ring-2 focus:ring-accent outline-none resize-none" placeholder="Tell us about your project..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                    </div>
                    <button type="submit" className="w-full flex items-center justify-center px-6 py-4 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark">
                      <Send className="w-4 h-4 mr-2" />Send Message
                    </button>
                  </>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
