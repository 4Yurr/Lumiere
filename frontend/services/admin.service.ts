import { apiClient } from '@/lib/api-client';
import {
  User,
  Template,
  Invitation,
  Order,
  Payment,
  Photographer,
  PhotographerPortfolio,
} from '@/types';

export const adminService = {
  // Users
  getUsers: async (): Promise<User[]> => apiClient.get<User[]>('/admin/users'),
  getUserById: async (id: number): Promise<User> => apiClient.get<User>(`/admin/users/${id}`),
  updateUserStatus: async (id: number, status: string): Promise<User> =>
    apiClient.put<User>(`/admin/users/${id}/status`, { status }),

  // Templates
  getTemplates: async (): Promise<Template[]> => apiClient.get<Template[]>('/admin/templates'),
  createTemplate: async (data: any): Promise<Template> => apiClient.post<Template>('/admin/templates', data),
  updateTemplate: async (id: number, data: any): Promise<Template> =>
    apiClient.put<Template>(`/admin/templates/${id}`, data),
  deleteTemplate: async (id: number): Promise<{ success: boolean }> =>
    apiClient.delete<{ success: boolean }>(`/admin/templates/${id}`),

  // Invitations
  getInvitations: async (): Promise<Invitation[]> => apiClient.get<Invitation[]>('/admin/invitations'),
  updateInvitationStatus: async (id: number, status: string): Promise<Invitation> =>
    apiClient.put<Invitation>(`/admin/invitations/${id}/status`, { status }),

  // Orders & Payments
  getOrders: async (): Promise<Order[]> => apiClient.get<Order[]>('/admin/orders'),
  getPayments: async (): Promise<Payment[]> => apiClient.get<Payment[]>('/admin/payments'),

  // Photographers
  getPhotographers: async (): Promise<Photographer[]> => apiClient.get<Photographer[]>('/admin/photographers'),
  createPhotographer: async (data: any): Promise<Photographer> =>
    apiClient.post<Photographer>('/admin/photographers', data),
  updatePhotographer: async (id: number, data: any): Promise<Photographer> =>
    apiClient.put<Photographer>(`/admin/photographers/${id}`, data),
  deletePhotographer: async (id: number): Promise<{ success: boolean }> =>
    apiClient.delete<{ success: boolean }>(`/admin/photographers/${id}`),

  // Portfolios
  getPortfolios: async (photographerId: number): Promise<PhotographerPortfolio[]> =>
    apiClient.get<PhotographerPortfolio[]>(`/admin/photographers/${photographerId}/portfolio`),
  createPortfolio: async (photographerId: number, data: any): Promise<PhotographerPortfolio> =>
    apiClient.post<PhotographerPortfolio>(`/admin/photographers/${photographerId}/portfolio`, data),
  deletePortfolio: async (id: number): Promise<{ success: boolean }> =>
    apiClient.delete<{ success: boolean }>(`/admin/portfolio/${id}`),
};
