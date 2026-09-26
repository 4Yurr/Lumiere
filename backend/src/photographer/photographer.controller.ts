import { Controller, Get, Param, Query } from '@nestjs/common';
import { PhotographerService } from './photographer.service';

@Controller('photographers')
export class PhotographerController {
  constructor(private readonly photographerService: PhotographerService) {}

  @Get()
  findAll(@Query('category') category?: string) {
    return this.photographerService.findAll(category);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.photographerService.findBySlug(slug);
  }

  @Get(':slug/portfolio')
  findPortfolio(@Param('slug') slug: string) {
    return this.photographerService.findPortfolio(slug);
  }
}
