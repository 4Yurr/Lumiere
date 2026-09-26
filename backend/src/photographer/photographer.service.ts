import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PhotographerService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(category?: string) {
    return this.prisma.photographer.findMany({
      where: {
        status: 'ACTIVE',
        ...(category
          ? { category: { name: { equals: category, mode: 'insensitive' } } }
          : {}),
      },
      include: { category: true },
      orderBy: { name: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const photographer = await this.prisma.photographer.findUnique({
      where: { slug },
      include: { category: true, portfolios: { orderBy: { sortOrder: 'asc' } } },
    });
    if (!photographer) throw new NotFoundException(`Photographer '${slug}' not found`);
    return photographer;
  }

  async findPortfolio(slug: string) {
    const photographer = await this.prisma.photographer.findUnique({
      where: { slug },
      include: { portfolios: { orderBy: { sortOrder: 'asc' } } },
    });
    if (!photographer) throw new NotFoundException(`Photographer '${slug}' not found`);
    return photographer.portfolios;
  }
}
