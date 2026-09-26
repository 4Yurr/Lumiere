import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateOrderDto) {
    const invitation = await this.prisma.invitation.findUnique({
      where: { id: dto.invitationId },
      include: { template: true },
    });

    if (!invitation) throw new NotFoundException('Invitation not found');
    if (invitation.userId !== userId) throw new BadRequestException('Not your invitation');

    const order = await this.prisma.order.create({
      data: {
        userId,
        invitationId: dto.invitationId,
        amount: invitation.template.price,
        status: 'PENDING',
      },
      include: { invitation: true },
    });

    // Update invitation status to PENDING_PAYMENT
    await this.prisma.invitation.update({
      where: { id: dto.invitationId },
      data: { status: 'PENDING_PAYMENT' },
    });

    return order;
  }

  findAllByUser(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { invitation: { include: { template: true } }, payments: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const order = await this.prisma.order.findFirst({
      where: { id, userId },
      include: { invitation: true, payments: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
