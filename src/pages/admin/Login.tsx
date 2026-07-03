import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      const res = await fetch(`${API_BASE}/api/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('admin_auth', 'true');
        localStorage.setItem('admin_token', data.access_token);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch {
      // Fallback: allow hardcoded login if backend is offline
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('admin_auth', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Could not connect to server. Check backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white px-4 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#C9A227]/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#0f0f0f] border border-white/5 p-8 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-sm font-semibold tracking-[0.3em] text-[#C9A227] uppercase mb-2">
            Damn Aluminium
          </h2>
          <h1 className="text-2xl font-bold font-serif">Admin Portal</h1>
          <p className="text-xs text-gray-500 mt-1">Sign in to manage website content dynamically</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-xl text-xs mb-6">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#141414] border border-white/5 rounded-xl text-sm focus:border-[#C9A227] outline-none text-white transition-colors"
                placeholder="Enter admin username"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#141414] border border-white/5 rounded-xl text-sm focus:border-[#C9A227] outline-none text-white transition-colors"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#C9A227] to-[#F4D03F] text-black font-bold text-sm tracking-wider rounded-xl hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-6 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
