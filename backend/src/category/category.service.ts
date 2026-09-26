import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryType } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(type?: CategoryType) {
    return this.prisma.category.findMany({
      where: {
        status: 'ACTIVE',
        ...(type ? { type } : {}),
      },
      orderBy: { name: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }
}
