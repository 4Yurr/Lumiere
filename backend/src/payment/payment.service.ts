import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async createPayment(userId: number, dto: CreatePaymentDto) {
    const order = await this.prisma.order.findFirst({
      where: { id: dto.orderId, userId },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== 'PENDING') {
      throw new BadRequestException(`Order status is '${order.status}', cannot initiate payment`);
    }

    // Create payment record (integrate with Midtrans/Xendit here)
    const payment = await this.prisma.payment.create({
      data: {
        orderId: dto.orderId,
        provider: dto.provider,
        amount: order.amount,
        status: 'PENDING',
      },
    });

    // TODO: Call payment gateway API and attach transaction_id
    // payment_gateway_response = await midtrans.charge({ ... })
    // await prisma.payment.update({ where: { id: payment.id }, data: { transactionId: ... } })

    return payment;
  }

  /**
   * Webhook handler — called by payment gateway (Midtrans/Xendit) after payment.
   * Do NOT trust the frontend; always verify from the gateway directly.
   */
  async handleWebhook(payload: Record<string, any>) {
    const { transaction_id, transaction_status, order_id } = payload;

    // Find the payment record
    const payment = await this.prisma.payment.findFirst({
      where: { transactionId: transaction_id },
    });

    if (!payment) {
      // Try to find by order reference
      throw new NotFoundException('Payment record not found');
    }

    const isSuccess = transaction_status === 'settlement' || transaction_status === 'capture';

    await this.prisma.$transaction(async (tx) => {
      // Update payment status
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: isSuccess ? 'PAID' : 'FAILED',
          paidAt: isSuccess ? new Date() : null,
          rawResponse: payload,
        },
      });

      // Update order status
      await tx.order.update({
        where: { id: payment.orderId },
        data: { status: isSuccess ? 'PAID' : 'FAILED' },
      });

      if (isSuccess) {
        // Activate the invitation
        const order = await tx.order.findUnique({ where: { id: payment.orderId } });
        if (order) {
          await tx.invitation.update({
            where: { id: order.invitationId },
            data: { status: 'ACTIVE' },
          });
        }
      }
    });

    return { received: true };
  }
}
