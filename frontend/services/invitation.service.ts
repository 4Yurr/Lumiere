import { apiClient } from '@/lib/api-client';
import { Invitation, InvitationData } from '@/types';

export const invitationService = {
  create: async (data: { templateId: number; slug: string; data: InvitationData }): Promise<Invitation> => {
    return apiClient.post<Invitation>('/invitations', data);
  },

  getMyInvitations: async (): Promise<Invitation[]> => {
    return apiClient.get<Invitation[]>('/invitations');
  },

  getBySlug: async (slug: string): Promise<Invitation> => {
    return apiClient.get<Invitation>(`/invitations/${slug}`);
  },

  update: async (id: number, data: { data?: InvitationData; status?: string }): Promise<Invitation> => {
    return apiClient.put<Invitation>(`/invitations/${id}`, data);
  },

  delete: async (id: number): Promise<{ success: boolean }> => {
    return apiClient.delete<{ success: boolean }>(`/invitations/${id}`);
  },
};
