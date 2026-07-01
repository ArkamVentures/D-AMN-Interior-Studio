import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle, Send } from 'lucide-react';
import { useData } from '../context/DataContext';

export const ContactPage: React.FC = () => {
  const { contact, globalSettings, addSubmission } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMessage = `[Project Type: ${formData.service}] [Budget: ${formData.phone}] - ${formData.message}`;
    addSubmission({
      name: formData.name,
      email: formData.email,
      service: formData.service,
      phone: formData.phone,
      message: formattedMessage
    });
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      <section className="py-24 bg-primary dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Request a Quote</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Fast, professional aluminium fabrication quotes with expert support every step of the way.
          </p>
          <p className="text-sm text-gray-400 mt-4 uppercase tracking-[0.3em]">
            Email us at <a href={`mailto:${contact.email}`} className="text-accent hover:text-white">{contact.email}</a>
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-center sm:items-center sm:space-x-6 space-y-4 sm:space-y-0 text-sm text-gray-300">
            <a href={globalSettings.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-gray-100 hover:border-[#C9A227] hover:text-white transition-all duration-300">
              WhatsApp: {contact.whatsapp}
            </a>
            <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-gray-100 hover:border-[#C9A227] hover:text-white transition-all duration-300">
              Call Now: {contact.phone}
            </a>
          </div>
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
                  <div><h4 className="font-semibold text-primary dark:text-white">Location</h4><p className="text-gray-600 dark:text-gray-400 text-sm">{contact.address}</p></div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-accent mt-1" />
                  <div><h4 className="font-semibold text-primary dark:text-white">Phone</h4><p className="text-gray-600 dark:text-gray-400 text-sm">{contact.phone}</p></div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-accent mt-1" />
                  <div><h4 className="font-semibold text-primary dark:text-white">Email</h4><p className="text-gray-600 dark:text-gray-400 text-sm">{contact.email}</p></div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-accent mt-1" />
                  <div><h4 className="font-semibold text-primary dark:text-white">Hours</h4><p className="text-gray-600 dark:text-gray-400 text-sm">{contact.hours}</p></div>
                </div>
              </div>
              <a href={globalSettings.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20ba5a] transition-all hover:shadow-[0_0_15px_rgba(37,211,102,0.4)]">
                <MessageCircle className="w-5 h-5 mr-2" />Chat with us
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-primary dark:text-white mb-2">Project Type</label>
                        <select required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent dark:text-white focus:ring-2 focus:ring-accent outline-none" value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})}>
                          <option value="">Select service</option>
                          <option value="Aluminium Fabrication">Aluminium Fabrication</option>
                          <option value="Custom Design">Custom Design</option>
                          <option value="Industrial Solution">Industrial Solution</option>
                          <option value="Project Consultation">Project Consultation</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary dark:text-white mb-2">Budget</label>
                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent dark:text-white focus:ring-2 focus:ring-accent outline-none" placeholder="Estimated budget" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-primary dark:text-white mb-2">Project Details</label>
                      <textarea rows={5} required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent dark:text-white focus:ring-2 focus:ring-accent outline-none resize-none" placeholder="Tell us about your project..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                    </div>
                    <button type="submit" className="w-full flex items-center justify-center px-6 py-4 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark">
                      <Send className="w-4 h-4 mr-2" />Request Quote
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
