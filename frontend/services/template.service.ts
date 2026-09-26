import { apiClient } from '@/lib/api-client';
import { Template } from '@/types';

export const templateService = {
  getAll: async (params?: { categoryId?: number; slug?: string }): Promise<Template[]> => {
    const searchParams = new URLSearchParams();
    if (params?.categoryId) searchParams.append('categoryId', params.categoryId.toString());
    if (params?.slug) searchParams.append('slug', params.slug);
    const qs = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return apiClient.get<Template[]>(`/templates${qs}`);
  },

  getBySlug: async (slug: string): Promise<Template> => {
    return apiClient.get<Template>(`/templates/${slug}`);
  },
};
