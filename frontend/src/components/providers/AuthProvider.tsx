'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { api } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = Cookies.get('accessToken');
      if (token) {
        try {
          // Verify token and get user info
          const response = await api.get('/auth/me');
          setUser(response.data);
        } catch (error) {
          // Token invalid, try to refresh
          try {
            await refreshToken();
          } catch {
            // Refresh failed, clear auth
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { accessToken, refreshToken: newRefreshToken, user: userData } = response.data;
      
      // Store tokens in httpOnly cookies (handled by backend)
      // For now, store in regular cookies (in production, use httpOnly)
      Cookies.set('accessToken', accessToken, { expires: 1/24 }); // 1 hour
      Cookies.set('refreshToken', newRefreshToken, { expires: 7 }); // 7 days
      
      setUser(userData);
      router.push('/');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await api.post('/auth/register', { email, password, name });
      const { accessToken, refreshToken: newRefreshToken, user: userData } = response.data;
      
      Cookies.set('accessToken', accessToken, { expires: 1/24 });
      Cookies.set('refreshToken', newRefreshToken, { expires: 7 });
      
      setUser(userData);
      router.push('/');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setUser(null);
    router.push('/');
  };

  const refreshToken = async () => {
    try {
      const refreshTokenValue = Cookies.get('refreshToken');
      if (!refreshTokenValue) throw new Error('No refresh token');
      
      const response = await api.post('/auth/refresh', { refreshToken: refreshTokenValue });
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      
      Cookies.set('accessToken', accessToken, { expires: 1/24 });
      Cookies.set('refreshToken', newRefreshToken, { expires: 7 });
    } catch (error) {
      throw new Error('Token refresh failed');
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
