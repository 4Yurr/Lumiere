import { apiClient } from '@/lib/api-client';
import { Order } from '@/types';

export const orderService = {
  create: async (invitationId: number): Promise<Order> => {
    return apiClient.post<Order>('/orders', { invitationId });
  },

  getMyOrders: async (): Promise<Order[]> => {
    return apiClient.get<Order[]>('/orders');
  },

  getById: async (id: number): Promise<Order> => {
    return apiClient.get<Order>(`/orders/${id}`);
  },
};
