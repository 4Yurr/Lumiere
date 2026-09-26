'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { authService } from '@/services/auth.service';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    try {
      const storedToken = authService.getToken();
      if (!storedToken) {
        setUser(null);
        setToken(null);
        setIsLoading(false);
        return;
      }
      setToken(storedToken);
      const profile = await authService.getProfile();
      setUser(profile);
      if (typeof window !== 'undefined') {
        localStorage.setItem('lumiere_user', JSON.stringify(profile));
      }
    } catch {
      // Stored token may be invalid/expired
      setUser(null);
      setToken(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('lumiere_token');
        localStorage.removeItem('lumiere_user');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Read local cache first for instant render
    const cachedUser = authService.getStoredUser();
    const cachedToken = authService.getToken();
    if (cachedUser && cachedToken) {
      setUser(cachedUser);
      setToken(cachedToken);
    }
    refreshUser();
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await authService.login(email, pass);
    setUser(res.user);
    setToken(res.access_token);
  };

  const register = async (name: string, email: string, pass: string) => {
    await authService.register(name, email, pass);
    await login(email, pass);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setToken(null);
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAdmin,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
