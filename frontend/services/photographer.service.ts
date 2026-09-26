import { apiClient } from '@/lib/api-client';
import { Photographer, PhotographerPortfolio } from '@/types';

export const photographerService = {
  getAll: async (params?: { category?: string; location?: string }): Promise<Photographer[]> => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.location) searchParams.append('location', params.location);
    const qs = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return apiClient.get<Photographer[]>(`/photographers${qs}`);
  },

  getBySlug: async (slug: string): Promise<Photographer> => {
    return apiClient.get<Photographer>(`/photographers/${slug}`);
  },

  getPortfolios: async (slug: string): Promise<PhotographerPortfolio[]> => {
    return apiClient.get<PhotographerPortfolio[]>(`/photographers/${slug}/portfolio`);
  },
};
