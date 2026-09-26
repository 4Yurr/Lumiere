import { apiClient } from '@/lib/api-client';
import { Payment } from '@/types';

export const paymentService = {
  create: async (data: { orderId: number; provider: string }): Promise<Payment> => {
    return apiClient.post<Payment>('/payments', data);
  },
};
