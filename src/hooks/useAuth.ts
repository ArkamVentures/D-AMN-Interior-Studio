import { useState, useEffect, useCallback } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem('admin_token');
    const authFlag = localStorage.getItem('admin_auth');

    if (!token && !authFlag) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    if (token) {
      try {
        // Verify token is still valid by calling a protected endpoint
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          // Token expired or invalid — clear storage
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_auth');
          setIsAuthenticated(false);
        }
      } catch {
        // Backend offline — fall back to local auth flag
        if (authFlag === 'true') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
    } else if (authFlag === 'true') {
      // Fallback mode (no token, but auth flag set from hardcoded login)
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return { isAuthenticated, isLoading, logout, verifyToken };
}
