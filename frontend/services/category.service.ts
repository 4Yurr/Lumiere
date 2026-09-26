import { apiClient } from '@/lib/api-client';
import { Category, CategoryType } from '@/types';

export const categoryService = {
  getAll: async (type?: CategoryType): Promise<Category[]> => {
    const query = type ? `?type=${type}` : '';
    return apiClient.get<Category[]>(`/categories${query}`);
  },

  getById: async (id: number): Promise<Category> => {
    return apiClient.get<Category>(`/categories/${id}`);
  },
};
