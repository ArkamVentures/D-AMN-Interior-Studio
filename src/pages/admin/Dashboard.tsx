import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData, ServiceItem, TeamMember, ProjectItem, ProjectPhotoItem, PricingPackageItem, BlogPostItem } from '../../context/DataContext';
import { 
  LayoutDashboard, Home, Info, Hammer, Briefcase, DollarSign, 
  FileText, Phone, Settings, LogOut, Plus, Trash2, Edit2, 
  Eye, Check, Mail, MessageSquare, Menu, X, ArrowUpRight, User, Inbox, RefreshCw, Cloud
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface ContactMessage {
  id: number;
  name: string;
  phone: string;
  email?: string;
  service: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const data = useData();

  // Authentication check
  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  // State
  const [activeTab, setActiveTab] = useState<'overview' | 'home' | 'about' | 'services' | 'portfolio' | 'pricing' | 'blog' | 'contact' | 'global' | 'inbox'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Real contact messages from backend
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
  };

  const fetchMessages = useCallback(async () => {
    setMessagesLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/contact/messages`, { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch { /* silent fail */ } finally {
      setMessagesLoading(false);
    }
  }, []);

  const markAsRead = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/contact/messages/${id}/read`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ is_read: true }),
      });
      if (res.ok) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
        showToast('Message marked as read');
      }
    } catch { showToast('Failed to update', 'error'); }
  };

  const deleteMessage = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/contact/messages/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setMessages(prev => prev.filter(m => m.id !== id));
        showToast('Message deleted');
      }
    } catch { showToast('Failed to delete', 'error'); }
  };

  useEffect(() => {
    if (activeTab === 'inbox' || activeTab === 'overview') fetchMessages();
  }, [activeTab, fetchMessages]);

  // Form states
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [newService, setNewService] = useState<Omit<ServiceItem, 'id'>>({ title: '', tagline: '', features: [], iconName: 'Wind' });
  const [tempFeature, setTempFeature] = useState('');

  const [editingProject, setEditingProject] = useState<ProjectPhotoItem | null>(null);
  const [newProject, setNewProject] = useState<Omit<ProjectPhotoItem, 'id'>>({ src: '', location: 'Ambalangoda', service: 'Kitchen', title: '' });

  const [editingBlog, setEditingBlog] = useState<BlogPostItem | null>(null);
  const [newBlog, setNewBlog] = useState<Omit<BlogPostItem, 'id' | 'date'>>({ title: '', excerpt: '', content: '', image: '/gallery-9.png', category: 'General', readTime: '5 min read', status: 'published' });

  const [editingPackage, setEditingPackage] = useState<PricingPackageItem | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const [publishing, setPublishing] = useState(false);
  const handlePublish = async () => {
    setPublishing(true);
    await data.saveToAPI();
    setPublishing(false);
    showToast('✅ Published! Opening live website to verify...');
    setTimeout(() => {
      window.open(window.location.origin.includes('localhost')
        ? 'http://localhost:5173/'
        : 'https://damn-aluminium.vercel.app/',
        '_blank'
      );
    }, 1000);
  };

  const [waking, setWaking] = useState(false);
  const handleWakeServer = async () => {
    setWaking(true);
    try {
      // Ping backend to wake Railway from sleep (can take 60+ seconds)
      await fetch(`${API_BASE}/api/settings`, { signal: AbortSignal.timeout(90000) });
      // Auto-login to get a fresh token
      const formData = new URLSearchParams();
      formData.append('username', 'admin');
      formData.append('password', 'admin123');
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
        signal: AbortSignal.timeout(15000),
      });
      if (res.ok) {
        const d = await res.json();
        localStorage.setItem('admin_token', d.access_token);
        showToast('✅ Server connected! You can now publish.');
      }
    } catch {
      showToast('❌ Server still waking up. Try again in 30s.');
    } finally {
      setWaking(false);
    }
  };

  // Base64 Image converter utility
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
        showToast('Image uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row relative">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-xl border text-sm font-semibold shadow-2xl flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-[#25D366]/10 border-[#25D366]/20 text-[#25D366]' : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          <Check className="w-4 h-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`w-full md:w-64 bg-[#0a0a0a] border-r border-white/5 flex-shrink-0 flex flex-col z-20 ${
        mobileMenuOpen ? 'fixed inset-0' : 'hidden md:flex'
      }`}>
        {/* Header */}
        <div className="h-20 px-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-[0.2em] text-white">
              D-AMN
            </span>
            <span className="text-[8px] uppercase tracking-wider text-gray-500">
              Admin Portal
            </span>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'inbox', label: 'Inbox', icon: Inbox, badge: messages.filter(m => !m.is_read).length },
            { id: 'home', label: 'Home Page', icon: Home },
            { id: 'about', label: 'About Tab', icon: Info },
            { id: 'services', label: 'Services', icon: Hammer },
            { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
            { id: 'pricing', label: 'Pricing Plan', icon: DollarSign },
            { id: 'blog', label: 'Blog Posts', icon: FileText },
            { id: 'contact', label: 'Contact', icon: Phone },
            { id: 'global', label: 'Settings', icon: Settings },
          ].map((link: any) => {
            const Icon = link.icon;
            const active = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                  active 
                    ? 'bg-[#C9A227] text-black shadow-lg shadow-[#C9A227]/25' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-grow text-left">{link.label}</span>
                {link.badge > 0 && (
                  <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                    active ? 'bg-black/30 text-black' : 'bg-[#C9A227] text-black'
                  }`}>{link.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-bold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Navbar */}
      <header className="md:hidden h-20 bg-[#0a0a0a] border-b border-white/5 px-6 flex items-center justify-between">
        <span className="font-serif text-lg font-bold tracking-[0.2em]">D-AMN</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#C9A227] text-black text-xs font-bold rounded-lg disabled:opacity-60"
          >
            <Cloud className="w-3.5 h-3.5" />
            {publishing ? 'Saving...' : 'Publish'}
          </button>
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 hover:bg-white/5 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-grow p-6 md:p-10 max-w-5xl mx-auto w-full overflow-y-auto">

        {/* Publish Bar */}
        <div className="mb-6 flex items-center justify-between bg-[#0f0f0f] border border-white/5 rounded-2xl px-5 py-3 gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${data.apiSynced ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`} />
            <span className="text-xs text-gray-400">
              {data.apiSynced
                ? '🟢 Connected to live website'
                : '🟡 Connecting to server... (may take ~60s on first load)'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {!data.apiSynced && (
              <button
                onClick={handleWakeServer}
                disabled={waking}
                className="flex items-center gap-1.5 px-3 py-2 border border-white/10 hover:border-white/20 text-gray-300 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${waking ? 'animate-spin' : ''}`} />
                {waking ? 'Waking server...' : 'Wake Server'}
              </button>
            )}
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="flex items-center gap-2 px-4 py-2 bg-[#C9A227] hover:bg-[#F4D03F] text-black text-sm font-bold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Cloud className="w-4 h-4" />
              {publishing ? 'Publishing...' : 'Publish to Live Website'}
            </button>
          </div>
        </div>

        {/* ─── Tab 1: Overview ─────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold font-serif mb-2">Welcome Back, Admin</h1>
              <p className="text-gray-400 text-sm">Dashboard metrics and incoming enquiries overview</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'totalProjects', title: 'Total Projects', value: data.dashboardStatsOverrides?.totalProjects || (data.projectPhotosList?.length || 0).toString(), color: 'from-blue-500/10 to-blue-500/20 text-blue-400 border-blue-500/10' },
                { key: 'blogPosts', title: 'Blog Posts', value: data.dashboardStatsOverrides?.blogPosts || (data.blogsList?.length || 0).toString(), color: 'from-purple-500/10 to-purple-500/20 text-purple-400 border-purple-500/10' },
                { key: 'pendingEnquiries', title: 'Pending Enquiries', value: data.dashboardStatsOverrides?.pendingEnquiries || (data.submissionsList?.filter(s => !s.read)?.length || 0).toString(), color: 'from-amber-500/10 to-amber-500/20 text-amber-400 border-amber-500/10' },
                { key: 'activeServices', title: 'Active Services', value: data.dashboardStatsOverrides?.activeServices || (data.servicesList?.length || 0).toString(), color: 'from-[#C9A227]/10 to-[#C9A227]/20 text-[#C9A227] border-[#C9A227]/10' },
              ].map((stat, i) => (
                <div key={i} className={`p-6 bg-gradient-to-br border rounded-2xl ${stat.color} relative group`}>
                  <h3 className="text-xs uppercase tracking-wider font-semibold opacity-60 mb-2">{stat.title}</h3>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => {
                      const updated = { ...data.dashboardStatsOverrides };
                      updated[stat.key as keyof typeof updated] = e.target.value;
                      data.setDashboardStatsOverrides(updated);
                    }}
                    placeholder="Auto"
                    className="text-3xl font-serif font-bold bg-transparent outline-none w-full border-b border-transparent focus:border-current transition-colors"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-60 transition-opacity">
                    <Edit2 className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Enquiries */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold font-serif flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#C9A227]" />
                  Recent Messages
                </h2>
                <div className="flex gap-2">
                  <button onClick={fetchMessages} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors" title="Refresh">
                    <RefreshCw className={`w-4 h-4 ${messagesLoading ? 'animate-spin' : ''}`} />
                  </button>
                  <button onClick={() => setActiveTab('inbox')} className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-colors">
                    View All
                  </button>
                </div>
              </div>

              {messagesLoading ? (
                <p className="text-gray-500 text-sm py-6 text-center">Loading messages...</p>
              ) : messages.length === 0 ? (
                <p className="text-gray-500 text-sm py-6 text-center">No contact form messages received yet.</p>
              ) : (
                <div className="space-y-4">
                  {messages.slice(0, 5).map((msg) => (
                    <div key={msg.id} className="p-4 bg-black/40 border border-white/5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{msg.name}</span>
                          {!msg.is_read && (
                            <span className="px-2 py-0.5 bg-[#C9A227]/25 text-[#C9A227] text-[10px] uppercase font-bold rounded">New</span>
                          )}
                          <span className="text-[10px] text-gray-500">{msg.service}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{msg.phone}{msg.email ? ` | ${msg.email}` : ''} | {new Date(msg.created_at).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-300 mt-2 font-medium line-clamp-2">"{msg.message}"</p>
                      </div>
                      {!msg.is_read && (
                        <button
                          onClick={() => markAsRead(msg.id)}
                          className="px-4 py-2 border border-white/10 hover:border-[#C9A227] text-xs font-semibold rounded-lg self-start md:self-auto transition-colors"
                        >
                          Mark Read
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── Inbox Tab ─────────────────────────────────────── */}
        {activeTab === 'inbox' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Customer Inbox</h1>
                <p className="text-gray-400 text-sm">
                  {messages.filter(m => !m.is_read).length} unread of {messages.length} total messages
                </p>
              </div>
              <button
                onClick={fetchMessages}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-sm font-semibold transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${messagesLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {messagesLoading ? (
              <div className="text-center py-20 text-gray-500">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="text-center py-20">
                <Inbox className="w-16 h-16 mx-auto mb-4 text-gray-700" />
                <p className="text-gray-500">No messages yet. When customers submit the contact form, their messages will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-6 bg-[#0f0f0f] border rounded-2xl transition-colors ${
                      msg.is_read ? 'border-white/5' : 'border-[#C9A227]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-bold text-lg">{msg.name}</span>
                          {!msg.is_read && (
                            <span className="px-2 py-0.5 bg-[#C9A227]/25 text-[#C9A227] text-[10px] uppercase font-bold rounded">New</span>
                          )}
                          <span className="text-xs px-2 py-0.5 bg-white/5 rounded text-gray-400">{msg.service}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                          <span>📞 {msg.phone}</span>
                          {msg.email && <span>✉️ {msg.email}</span>}
                          <span>🕐 {new Date(msg.created_at).toLocaleString()}</span>
                        </div>
                        <p className="text-gray-200 leading-relaxed">{msg.message}</p>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        {!msg.is_read && (
                          <button
                            onClick={() => markAsRead(msg.id)}
                            className="px-3 py-2 border border-[#C9A227]/40 hover:border-[#C9A227] hover:bg-[#C9A227]/10 text-[#C9A227] text-xs font-semibold rounded-lg transition-colors"
                          >
                            Mark Read
                          </button>
                        )}
                        <a
                          href={`tel:${msg.phone}`}
                          className="px-3 py-2 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 text-green-400 text-xs font-semibold rounded-lg transition-colors text-center"
                        >
                          Call
                        </a>
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="px-3 py-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* ─── Tab 2: Home Page ─────────────────────────────────── */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold font-serif mb-2">Home Page settings</h1>
              <p className="text-gray-400 text-sm">Update the main landing page texts and Hero keywords</p>
            </div>

            <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">Hero Heading</label>
                <input 
                  type="text"
                  value={data.heroTitle}
                  onChange={(e) => data.setHeroTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">Hero Subtitle</label>
                <input 
                  type="text"
                  value={data.heroSubtitle}
                  onChange={(e) => data.setHeroSubtitle(e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">Keywords (separated by comma)</label>
                <input 
                  type="text"
                  value={data.heroKeywords.join(', ')}
                  onChange={(e) => data.setHeroKeywords(e.target.value.split(',').map(s => s.trim()))}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm outline-none focus:border-[#C9A227]"
                />
              </div>

              <button 
                onClick={() => showToast('Home page settings updated')}
                className="px-6 py-3 bg-[#C9A227] text-black font-bold rounded-xl text-sm hover:shadow-lg shadow-[#C9A227]/20 transition-all"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}

        {/* ─── Tab 3: About Page ─────────────────────────────────── */}
        {activeTab === 'about' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold font-serif mb-2">About Page settings</h1>
              <p className="text-gray-400 text-sm">Manage company story and core team information</p>
            </div>

            <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">About Title</label>
                <input 
                  type="text"
                  value={data.aboutTitle}
                  onChange={(e) => data.setAboutTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">About Subtitle</label>
                <input 
                  type="text"
                  value={data.aboutSubtitle}
                  onChange={(e) => data.setAboutSubtitle(e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">Company Story Paragraph</label>
                <textarea 
                  rows={6}
                  value={data.aboutParagraph}
                  onChange={(e) => data.setAboutParagraph(e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm outline-none focus:border-[#C9A227] resize-none"
                />
              </div>

              {/* Edit Team Members */}
              <div className="border-t border-white/5 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Team Members</h3>
                  <button 
                    onClick={() => {
                      data.setTeam([...data.team, { name: 'New Member', role: 'Role', bio: 'Bio...', image: '', whatsapp: '', email: '' }]);
                      showToast('Team member added');
                    }}
                    className="flex items-center gap-1 px-4 py-2 bg-[#C9A227] text-black font-bold rounded-xl text-xs"
                  >
                    <Plus className="w-4 h-4" /> Add Member
                  </button>
                </div>
                {data.team.map((member, idx) => (
                  <div key={idx} className="p-4 bg-black border border-white/5 rounded-xl space-y-4 relative group">
                    <button 
                      onClick={() => {
                        data.setTeam(data.team.filter((_, i) => i !== idx));
                        showToast('Team member removed');
                      }}
                      className="absolute top-4 right-4 p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-4">
                      <label className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C9A227] cursor-pointer group flex-shrink-0">
                        {member.image && member.image.trim() !== '' ? (
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" loading="lazy" />
                        ) : (
                          <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center group-hover:bg-[#222] transition-colors">
                            <User className="w-6 h-6 text-gray-500" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                          <Plus className="w-5 h-5 text-white" />
                        </div>
                        <input 
                          type="file" 
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, (base64) => {
                            const updated = [...data.team];
                            updated[idx].image = base64;
                            data.setTeam(updated);
                          })}
                        />
                      </label>
                      <div className="flex-grow grid grid-cols-2 gap-3 pr-10">
                        <input 
                          type="text" 
                          value={member.name} 
                          placeholder="Name"
                          onChange={(e) => {
                            const updated = [...data.team];
                            updated[idx].name = e.target.value;
                            data.setTeam(updated);
                          }}
                          className="px-3 py-1.5 bg-[#0f0f0f] border border-white/10 rounded-lg text-xs"
                        />
                        <input 
                          type="text" 
                          value={member.role} 
                          placeholder="Role"
                          onChange={(e) => {
                            const updated = [...data.team];
                            updated[idx].role = e.target.value;
                            data.setTeam(updated);
                          }}
                          className="px-3 py-1.5 bg-[#0f0f0f] border border-white/10 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                    <textarea 
                      rows={3} 
                      value={member.bio} 
                      placeholder="Biography"
                      onChange={(e) => {
                        const updated = [...data.team];
                        updated[idx].bio = e.target.value;
                        data.setTeam(updated);
                      }}
                      className="w-full px-3 py-2 bg-[#0f0f0f] border border-white/10 rounded-lg text-xs resize-none"
                    />
                  </div>
                ))}
              </div>

              <button 
                onClick={() => showToast('About settings saved successfully')}
                className="px-6 py-3 bg-[#C9A227] text-black font-bold rounded-xl text-sm hover:shadow-lg"
              >
                Save All Changes
              </button>
            </div>
          </div>
        )}

        {/* ─── Tab 4: Services ──────────────────────────────────── */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Services Manager</h1>
                <p className="text-gray-400 text-sm">Add, modify, or delete custom fabrication services</p>
              </div>
              <button 
                onClick={() => setEditingService({ id: 'temp-' + Date.now(), title: '', tagline: '', features: [], iconName: 'Wind' })}
                className="flex items-center gap-1 px-4 py-2 bg-[#C9A227] text-black font-bold rounded-xl text-xs"
              >
                <Plus className="w-4 h-4" /> Add Service
              </button>
            </div>

            {/* List Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.servicesList.map((service) => (
                <div key={service.id} className="p-6 bg-[#0f0f0f] border border-white/5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg text-white">{service.title}</h3>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingService(service)} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => {
                            data.setServicesList(data.servicesList.filter(s => s.id !== service.id));
                            showToast('Service deleted');
                          }}
                          className="p-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-[#C9A227] font-semibold mb-4 uppercase">"{service.tagline}"</p>
                    <ul className="space-y-1.5 mb-6">
                      {service.features.map((f, i) => (
                        <li key={i} className="text-xs text-gray-400 flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#C9A227]" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Editor Modal */}
            {editingService && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                <div className="bg-[#0f0f0f] border border-white/5 p-6 rounded-3xl w-full max-w-lg space-y-4">
                  <h3 className="text-xl font-bold font-serif">
                    {data.servicesList.find(s => s.id === editingService.id) ? 'Edit Service' : 'Add New Service'}
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Service Title</label>
                      <input 
                        type="text" 
                        value={editingService.title}
                        onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                        className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Tagline</label>
                      <input 
                        type="text" 
                        value={editingService.tagline}
                        onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                        className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Features</label>
                      <div className="flex gap-2 mb-2">
                        <input 
                          type="text" 
                          placeholder="Feature description"
                          value={tempFeature}
                          onChange={(e) => setTempFeature(e.target.value)}
                          className="flex-grow px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs"
                        />
                        <button 
                          onClick={() => {
                            if (tempFeature) {
                              setEditingService({ ...editingService, features: [...editingService.features, tempFeature] });
                              setTempFeature('');
                            }
                          }}
                          className="px-3 py-1.5 bg-white/5 text-xs rounded-lg"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                        {editingService.features.map((feat, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/5 text-[10px] rounded-full text-gray-300">
                            {feat}
                            <button onClick={() => setEditingService({ ...editingService, features: editingService.features.filter((_, i) => i !== idx) })}>
                              <X className="w-2.5 h-2.5 text-red-400 hover:text-white" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button onClick={() => setEditingService(null)} className="px-4 py-2 bg-white/5 text-xs rounded-lg">Cancel</button>
                    <button 
                      onClick={() => {
                        const exists = data.servicesList.find(s => s.id === editingService.id);
                        if (exists) {
                          data.setServicesList(data.servicesList.map(s => s.id === editingService.id ? editingService : s));
                        } else {
                          data.setServicesList([...data.servicesList, editingService]);
                        }
                        setEditingService(null);
                        showToast('Service layout updated successfully');
                      }}
                      className="px-4 py-2 bg-[#C9A227] text-black font-bold text-xs rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── Tab 5: Portfolio ─────────────────────────────────── */}
        {activeTab === 'portfolio' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Portfolio Manager</h1>
                <p className="text-gray-400 text-sm">Upload, tag, and publish dynamic projects with categories</p>
              </div>
              <button 
                onClick={() => setEditingProject({ id: 'temp-' + Date.now(), src: '', location: 'Ambalangoda', service: 'Kitchen', title: '' })}
                className="flex items-center gap-1 px-4 py-2 bg-[#C9A227] text-black font-bold rounded-xl text-xs"
              >
                <Plus className="w-4 h-4" /> Add Project Photo
              </button>
            </div>

            {/* Photo Grid */}
            {data.projectPhotosList.length === 0 ? (
              <div className="text-center py-12 bg-[#0f0f0f] border border-white/5 rounded-2xl">
                <p className="text-gray-400">No projects yet.</p>
                <button 
                  onClick={() => setEditingProject({ id: 'temp-' + Date.now(), src: '', location: 'Ambalangoda', service: 'Kitchen', title: '' })}
                  className="mt-4 text-[#C9A227] hover:underline transition"
                >
                  Add your first project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {data.projectPhotosList.map((photo) => (
                  <div key={photo.id} className="relative group bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden aspect-video">
                    <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button onClick={() => setEditingProject(photo)} className="p-2 bg-[#C9A227] text-black rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          data.setProjectPhotosList(data.projectPhotosList.filter(p => p.id !== photo.id));
                          showToast('Project removed');
                        }}
                        className="p-2 bg-red-500 text-white rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Modal project edit */}
            {editingProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                <div className="bg-[#0f0f0f] border border-white/5 p-6 rounded-3xl w-full max-w-lg space-y-4">
                  <h3 className="text-xl font-bold font-serif">Project Photo details</h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Title</label>
                      <input 
                        type="text" 
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Location</label>
                        <input 
                          type="text"
                          list="locations-list"
                          value={editingProject.location}
                          onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                          placeholder="Select or enter location"
                          className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white"
                        />
                        <datalist id="locations-list">
                          {Array.from(new Set(data.projectPhotosList.map(p => p.location))).sort().map(loc => (
                            <option key={loc} value={loc} />
                          ))}
                        </datalist>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Service Type</label>
                        <select 
                          value={editingProject.service}
                          onChange={(e) => setEditingProject({ ...editingProject, service: e.target.value })}
                          className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white"
                        >
                          {['Kitchen', 'Glass', 'Ceiling', 'Partition', 'Cladding', 'Gutter', 'Shop Fittings', 'Luxury', 'Budget', 'Wall', 'Office'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Upload Photo</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (base64) => setEditingProject({ ...editingProject, src: base64 }))}
                        className="text-xs file:bg-white/5 file:border-0 file:text-white file:px-3 file:py-1"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button onClick={() => setEditingProject(null)} className="px-4 py-2 bg-white/5 text-xs rounded-lg">Cancel</button>
                    <button 
                      onClick={() => {
                        const exists = data.projectPhotosList.find(p => p.id === editingProject.id);
                        if (exists) {
                          data.setProjectPhotosList(data.projectPhotosList.map(p => p.id === editingProject.id ? editingProject : p));
                        } else {
                          data.setProjectPhotosList([...data.projectPhotosList, editingProject]);
                        }
                        setEditingProject(null);
                        showToast('Project updated successfully');
                      }}
                      className="px-4 py-2 bg-[#C9A227] text-black font-bold text-xs rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── Tab 6: Pricing ───────────────────────────────────── */}
        {activeTab === 'pricing' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold font-serif mb-2">Pricing Manager</h1>
              <p className="text-gray-400 text-sm">Modify service package cards and highlight selections</p>
            </div>

            <div className="space-y-4">
              {data.pricingList.map((pkg) => (
                <div key={pkg.id} className="p-6 bg-[#0f0f0f] border border-white/5 rounded-2xl flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <h3 className="font-bold text-lg">{pkg.name}</h3>
                    <p className="text-sm text-[#C9A227] font-semibold">{pkg.price}</p>
                    <p className="text-xs text-gray-500 mt-1">{pkg.description}</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <button 
                      onClick={() => {
                        const updated = data.pricingList.map(p => p.id === pkg.id ? { ...p, highlighted: !p.highlighted } : p);
                        data.setPricingList(updated);
                        showToast('Highlighted status updated');
                      }}
                      className={`px-3 py-1.5 text-xs rounded-lg ${
                        pkg.highlighted ? 'bg-[#C9A227] text-black font-bold' : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      Featured
                    </button>
                    <button onClick={() => setEditingPackage(pkg)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal edit package */}
            {editingPackage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                <div className="bg-[#0f0f0f] border border-white/5 p-6 rounded-3xl w-full max-w-lg space-y-4">
                  <h3 className="text-xl font-bold font-serif">Edit Package Details</h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Package Name</label>
                      <input 
                        type="text" 
                        value={editingPackage.name}
                        onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                        className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Price Title</label>
                      <input 
                        type="text" 
                        value={editingPackage.price}
                        onChange={(e) => setEditingPackage({ ...editingPackage, price: e.target.value })}
                        className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Description</label>
                      <input 
                        type="text" 
                        value={editingPackage.description}
                        onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
                        className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button onClick={() => setEditingPackage(null)} className="px-4 py-2 bg-white/5 text-xs rounded-lg">Cancel</button>
                    <button 
                      onClick={() => {
                        data.setPricingList(data.pricingList.map(p => p.id === editingPackage.id ? editingPackage : p));
                        setEditingPackage(null);
                        showToast('Package updated successfully');
                      }}
                      className="px-4 py-2 bg-[#C9A227] text-black font-bold text-xs rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── Tab 7: Blog ──────────────────────────────────────── */}
        {activeTab === 'blog' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Blog Posts Manager</h1>
                <p className="text-gray-400 text-sm">Write, publish, or save draft blog posts and articles</p>
              </div>
              <button 
                onClick={() => setEditingBlog({ id: 'post-' + Date.now(), title: '', excerpt: '', content: '', image: '/gallery-9.png', category: 'General', readTime: '5 min read', date: new Date().toLocaleDateString(), status: 'published' })}
                className="flex items-center gap-1 px-4 py-2 bg-[#C9A227] text-black font-bold rounded-xl text-xs"
              >
                <Plus className="w-4 h-4" /> New Article
              </button>
            </div>

            <div className="space-y-4">
              {data.blogsList.map((post) => (
                <div key={post.id} className="p-6 bg-[#0f0f0f] border border-white/5 rounded-2xl flex items-center justify-between gap-6">
                  <div>
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{post.category} | {post.date} | {post.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingBlog(post)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        data.setBlogsList(data.blogsList.filter(p => p.id !== post.id));
                        showToast('Blog post deleted');
                      }}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal edit blog */}
            {editingBlog && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
                <div className="bg-[#0f0f0f] border border-white/5 p-6 rounded-3xl w-full max-w-2xl space-y-4 my-8">
                  <h3 className="text-xl font-bold font-serif">Blog Editor</h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Title</label>
                      <input 
                        type="text" 
                        value={editingBlog.title}
                        onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                        className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Category</label>
                        <input 
                          type="text" 
                          value={editingBlog.category}
                          onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                          className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Status</label>
                        <select 
                          value={editingBlog.status}
                          onChange={(e) => setEditingBlog({ ...editingBlog, status: e.target.value as any })}
                          className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Excerpt</label>
                      <input 
                        type="text" 
                        value={editingBlog.excerpt}
                        onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                        className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Content Editor</label>
                      <textarea 
                        rows={8}
                        value={editingBlog.content}
                        onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                        className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white font-mono resize-none"
                        placeholder="Write blog article details..."
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Upload Cover Photo</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (base64) => setEditingBlog({ ...editingBlog, image: base64 }))}
                        className="text-xs file:bg-white/5 file:border-0 file:text-white file:px-3 file:py-1"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button onClick={() => setEditingBlog(null)} className="px-4 py-2 bg-white/5 text-xs rounded-lg">Cancel</button>
                    <button 
                      onClick={() => {
                        const exists = data.blogsList.find(b => b.id === editingBlog.id);
                        if (exists) {
                          data.setBlogsList(data.blogsList.map(b => b.id === editingBlog.id ? editingBlog : b));
                        } else {
                          data.setBlogsList([...data.blogsList, editingBlog]);
                        }
                        setEditingBlog(null);
                        showToast('Article saved successfully');
                      }}
                      className="px-4 py-2 bg-[#C9A227] text-black font-bold text-xs rounded-lg"
                    >
                      Save Article
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── Tab 8: Contact ───────────────────────────────────── */}
        {activeTab === 'contact' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold font-serif mb-2">Contact details</h1>
              <p className="text-gray-400 text-sm">Update company location details, phone numbers, and WhatsApp links</p>
            </div>

            <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">Phone Number</label>
                  <input 
                    type="text"
                    value={data.contact.phone}
                    onChange={(e) => data.setContact({ ...data.contact, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">WhatsApp Number</label>
                  <input 
                    type="text"
                    value={data.contact.whatsapp}
                    onChange={(e) => data.setContact({ ...data.contact, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">Email Address</label>
                <input 
                  type="email"
                  value={data.contact.email}
                  onChange={(e) => data.setContact({ ...data.contact, email: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">Office Address</label>
                <input 
                  type="text"
                  value={data.contact.address}
                  onChange={(e) => data.setContact({ ...data.contact, address: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">Business Hours</label>
                <input 
                  type="text"
                  value={data.contact.hours}
                  onChange={(e) => data.setContact({ ...data.contact, hours: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm outline-none focus:border-[#C9A227]"
                />
              </div>

              <button 
                onClick={() => showToast('Contact information saved')}
                className="px-6 py-3 bg-[#C9A227] text-black font-bold rounded-xl text-sm hover:shadow-lg"
              >
                Save Contact Info
              </button>
            </div>
          </div>
        )}

        {/* ─── Tab 9: Global Settings ────────────────────────────── */}
        {activeTab === 'global' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold font-serif mb-2">Global Settings</h1>
              <p className="text-gray-400 text-sm">Configure site-wide preferences, social media icons, and reset configurations</p>
            </div>

            <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">Logo Header Text</label>
                  <input 
                    type="text"
                    value={data.globalSettings.logoText}
                    onChange={(e) => data.setGlobalSettings({ ...data.globalSettings, logoText: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">Logo Subtext</label>
                  <input 
                    type="text"
                    value={data.globalSettings.logoSubtext}
                    onChange={(e) => data.setGlobalSettings({ ...data.globalSettings, logoSubtext: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">Footer Copyright Text</label>
                <input 
                  type="text"
                  value={data.globalSettings.footerCopyright}
                  onChange={(e) => data.setGlobalSettings({ ...data.globalSettings, footerCopyright: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm outline-none focus:border-[#C9A227]"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-xl">
                <div>
                  <h4 className="text-sm font-semibold">Maintenance Mode</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Temporarily block frontend access</p>
                </div>
                <button 
                  onClick={() => {
                    data.setGlobalSettings({ ...data.globalSettings, maintenanceMode: !data.globalSettings.maintenanceMode });
                    showToast('Maintenance status updated');
                  }}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${
                    data.globalSettings.maintenanceMode ? 'bg-[#C9A227] justify-end' : 'bg-white/10 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-black rounded-full shadow-md" />
                </button>
              </div>

              <div className="border-t border-white/5 pt-6 space-y-4">
                <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider">Danger Zone</h3>
                <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Reset All Site Content</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Erase all LocalStorage modifications and restore site defaults</p>
                  </div>
                  <button 
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all site modifications?')) {
                        data.resetAllData();
                        showToast('Site data restored to defaults');
                      }
                    }}
                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded-lg transition-colors border border-red-500/10"
                  >
                    Reset Data
                  </button>
                </div>
              </div>

              <button 
                onClick={() => showToast('Global settings saved')}
                className="px-6 py-3 bg-[#C9A227] text-black font-bold rounded-xl text-sm hover:shadow-lg"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
