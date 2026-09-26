import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TemplateService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(category?: string) {
    return this.prisma.template.findMany({
      where: {
        status: 'ACTIVE',
        ...(category
          ? { category: { name: { equals: category, mode: 'insensitive' } } }
          : {}),
      },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const template = await this.prisma.template.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (!template) throw new NotFoundException(`Template '${slug}' not found`);
    return template;
  }

  findById(id: number) {
    return this.prisma.template.findUnique({
      where: { id },
      include: { category: true },
    });
  }
}
