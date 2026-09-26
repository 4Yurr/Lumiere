import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryType } from '@prisma/client';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(@Query('type') type?: CategoryType) {
    return this.categoryService.findAll(type);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }
}
