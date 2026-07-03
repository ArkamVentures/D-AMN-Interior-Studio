import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const sendViaWhatsApp = (data: typeof formData) => {
    const serviceName = data.service || 'General Enquiry';
    const text = encodeURIComponent(
      `*New Enquiry from Website*\n\n` +
      `*Name:* ${data.name}\n` +
      `*Phone:* ${data.phone}\n` +
      (data.email ? `*Email:* ${data.email}\n` : '') +
      `*Service:* ${serviceName}\n\n` +
      `*Message:*\n${data.message}`
    );
    window.open(`https://wa.me/94773724849?text=${text}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/api/contact/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          service: formData.service || 'General Enquiry',
          message: formData.message,
        }),
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });
      if (!response.ok) throw new Error('Server error');
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      // Backend unreachable — silently fall back to WhatsApp
      sendViaWhatsApp(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setSubmitting(false);
    }
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

            <div className="space-y-4 mb-8">
              {/* Phone */}
              <a href="tel:+94773724849" className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-colors duration-300">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(201,162,39,0.5)] transition-all duration-300 border border-white/10">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary dark:text-white mb-1 group-hover:text-accent transition-colors">Call Us</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">+94 77 372 4849</p>
                </div>
              </a>

              {/* Location */}
              <a href="https://maps.app.goo.gl/bidpDxH7mXRbKYWH8?g_st=iw" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-colors duration-300">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(201,162,39,0.5)] transition-all duration-300 border border-white/10">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary dark:text-white mb-1 group-hover:text-accent transition-colors">Visit Us</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">83/2, Zahira Road, Dharga Town</p>
                </div>
              </a>

              {/* Email (Optional as requested, adding placeholder mailto) */}
              <a href="mailto:damnaluminiumfabrication@gmail.com" className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-colors duration-300">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(201,162,39,0.5)] transition-all duration-300 border border-white/10">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary dark:text-white mb-1 group-hover:text-accent transition-colors">Email Us</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">damnaluminiumfabrication@gmail.com</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/94773724849" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-colors duration-300">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(201,162,39,0.5)] transition-all duration-300 border border-white/10">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary dark:text-white mb-1 group-hover:text-accent transition-colors">WhatsApp</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">+94 77 372 4849</p>
                </div>
              </a>

              {/* Call */}
              <a href="tel:+94773724849" className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-colors duration-300">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(201,162,39,0.5)] transition-all duration-300 border border-white/10">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary dark:text-white mb-1 group-hover:text-accent transition-colors">Call Us</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">+94 77 372 4849</p>
                </div>
              </a>

              {/* Business Hours (Keep as non-clickable info but styled consistently) */}
              <div className="flex items-center space-x-4 p-3 rounded-xl">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary dark:text-white mb-1">Business Hours</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Mon - Sat: 8:00 AM - 6:00 PM<br />Sun: By Appointment</p>
                </div>
              </div>
            </div>

            {/* Social Media Circular Buttons */}
            <div>
              <h4 className="font-semibold text-primary dark:text-white mb-4 pl-3">Connect With Us</h4>
              <div className="flex items-center gap-4 pl-3">
                <a href="https://www.instagram.com/damn_aluminum_fabrication?igsh=MWR5amxxbmJjZWpnZg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center text-white hover:text-[#E1306C] hover:scale-110 hover:shadow-[0_0_15px_rgba(225,48,108,0.5)] transition-all duration-300" aria-label="Instagram">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="https://www.facebook.com/share/176TCUV9L4/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center text-white hover:text-[#1877F2] hover:scale-110 hover:shadow-[0_0_15px_rgba(24,119,242,0.5)] transition-all duration-300" aria-label="Facebook">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://www.tiktok.com/@d_amn_aluminum?_t=ZS-90bDvAIN9nT&_r=1" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center text-white hover:text-white hover:border-white/30 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300" aria-label="TikTok">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                </a>
                <a href="https://chat.whatsapp.com/GhQOcjHwoR1FVgU3ikSXbF" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center text-white hover:text-[#25D366] hover:scale-110 hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] transition-all duration-300" aria-label="WhatsApp">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                </a>
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
                  <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">Message Received!</h3>
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
                    disabled={submitting}
                    className="w-full flex items-center justify-center px-6 py-4 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors shadow-lg shadow-accent/25 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <><span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white inline-block" />Sending...</>
                    ) : (
                      <><Send className="w-4 h-4 mr-2" />Book Free Site Visit</>
                    )}
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
