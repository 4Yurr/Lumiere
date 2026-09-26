import { apiClient } from '@/lib/api-client';
import { AuthResponse, User } from '@/types';

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    if (typeof window !== 'undefined' && res.access_token) {
      localStorage.setItem('lumiere_token', res.access_token);
      localStorage.setItem('lumiere_user', JSON.stringify(res.user));
    }
    return res;
  },

  register: async (name: string, email: string, password: string): Promise<User> => {
    return apiClient.post<User>('/auth/register', { name, email, password });
  },

  getProfile: async (): Promise<User> => {
    return apiClient.get<User>('/auth/me');
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore errors on logout
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('lumiere_token');
        localStorage.removeItem('lumiere_user');
      }
    }
  },

  getStoredUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const str = localStorage.getItem('lumiere_user');
    if (!str) return null;
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  },

  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('lumiere_token');
  },
};
