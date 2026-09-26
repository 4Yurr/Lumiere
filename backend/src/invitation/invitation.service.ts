import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';

@Injectable()
export class InvitationService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, dto: CreateInvitationDto) {
    return this.prisma.invitation.create({
      data: {
        userId,
        templateId: dto.templateId,
        slug: dto.slug,
        data: dto.data,
        status: 'DRAFT',
      },
      include: { template: true },
    });
  }

  findAllByUser(userId: number) {
    return this.prisma.invitation.findMany({
      where: { userId },
      include: { template: { include: { category: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const invitation = await this.prisma.invitation.findUnique({
      where: { slug },
      include: { template: { include: { category: true } } },
    });
    if (!invitation) throw new NotFoundException(`Invitation '${slug}' not found`);
    // Only return active invitations publicly
    if (invitation.status !== 'ACTIVE') {
      throw new NotFoundException(`Invitation '${slug}' is not available`);
    }
    return invitation;
  }

  async update(id: number, userId: number, dto: UpdateInvitationDto) {
    const invitation = await this.prisma.invitation.findUnique({ where: { id } });
    if (!invitation) throw new NotFoundException('Invitation not found');
    if (invitation.userId !== userId) throw new ForbiddenException();

    return this.prisma.invitation.update({
      where: { id },
      data: { ...dto },
    });
  }

  async remove(id: number, userId: number) {
    const invitation = await this.prisma.invitation.findUnique({ where: { id } });
    if (!invitation) throw new NotFoundException('Invitation not found');
    if (invitation.userId !== userId) throw new ForbiddenException();

    return this.prisma.invitation.delete({ where: { id } });
  }
}
