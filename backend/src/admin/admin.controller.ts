import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

// ─── Admin DTOs (inline for simplicity) ──────────────────────────────────────

import { IsString, IsInt, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryType, PhotographerStatus, TemplateStatus, UserStatus } from '@prisma/client';

class CreateTemplateDto {
  @IsInt() @Type(() => Number) categoryId: number;
  @IsString() name: string;
  @IsString() slug: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsOptional() thumbnail?: string;
  @IsNumber() @Type(() => Number) price: number;
}

class CreatePhotographerDto {
  @IsString() name: string;
  @IsString() slug: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsOptional() location?: string;
  @IsString() @IsOptional() whatsapp?: string;
  @IsInt() @Type(() => Number) categoryId: number;
  @IsNumber() @IsOptional() @Type(() => Number) startingPrice?: number;
  @IsString() @IsOptional() profileImage?: string;
}

class AddPortfolioDto {
  @IsString() imageUrl: string;
  @IsString() @IsOptional() title?: string;
  @IsInt() @IsOptional() @Type(() => Number) sortOrder?: number;
}

// ─── Controller ───────────────────────────────────────────────────────────────

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ── Users ──────────────────────────────────────────────────────────────────

  @Get('users')
  getUsers() { return this.adminService.getUsers(); }

  @Get('users/:id')
  getUser(@Param('id', ParseIntPipe) id: number) { return this.adminService.getUser(id); }

  @Put('users/:id/status')
  setUserStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: UserStatus) {
    return this.adminService.setUserStatus(id, status);
  }

  // ── Templates ─────────────────────────────────────────────────────────────

  @Get('templates')
  getTemplates() { return this.adminService.getTemplates(); }

  @Get('templates/:id')
  getTemplate(@Param('id', ParseIntPipe) id: number) { return this.adminService.getTemplate(id); }

  @Post('templates')
  createTemplate(@Body() dto: CreateTemplateDto) { return this.adminService.createTemplate(dto); }

  @Put('templates/:id')
  updateTemplate(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateTemplateDto>) {
    return this.adminService.updateTemplate(id, dto);
  }

  @Delete('templates/:id')
  deleteTemplate(@Param('id', ParseIntPipe) id: number) { return this.adminService.deleteTemplate(id); }

  // ── Invitations ───────────────────────────────────────────────────────────

  @Get('invitations')
  getInvitations() { return this.adminService.getInvitations(); }

  @Get('invitations/:id')
  getInvitation(@Param('id', ParseIntPipe) id: number) { return this.adminService.getInvitation(id); }

  @Put('invitations/:id/status')
  setInvitationStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: string) {
    return this.adminService.setInvitationStatus(id, status as any);
  }

  // ── Orders ────────────────────────────────────────────────────────────────

  @Get('orders')
  getOrders() { return this.adminService.getOrders(); }

  @Get('orders/:id')
  getOrder(@Param('id', ParseIntPipe) id: number) { return this.adminService.getOrder(id); }

  // ── Payments ──────────────────────────────────────────────────────────────

  @Get('payments')
  getPayments() { return this.adminService.getPayments(); }

  @Get('payments/:id')
  getPayment(@Param('id', ParseIntPipe) id: number) { return this.adminService.getPayment(id); }

  // ── Photographers ─────────────────────────────────────────────────────────

  @Get('photographers')
  getPhotographers() { return this.adminService.getPhotographers(); }

  @Get('photographers/:id')
  getPhotographer(@Param('id', ParseIntPipe) id: number) { return this.adminService.getPhotographer(id); }

  @Post('photographers')
  createPhotographer(@Body() dto: CreatePhotographerDto) { return this.adminService.createPhotographer(dto); }

  @Put('photographers/:id')
  updatePhotographer(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreatePhotographerDto>) {
    return this.adminService.updatePhotographer(id, dto);
  }

  @Delete('photographers/:id')
  deletePhotographer(@Param('id', ParseIntPipe) id: number) { return this.adminService.deletePhotographer(id); }

  // ── Portfolio ─────────────────────────────────────────────────────────────

  @Get('photographers/:id/portfolio')
  getPortfolio(@Param('id', ParseIntPipe) id: number) { return this.adminService.getPortfolio(id); }

  @Post('photographers/:id/portfolio')
  addPortfolio(@Param('id', ParseIntPipe) id: number, @Body() dto: AddPortfolioDto) {
    return this.adminService.addPortfolio(id, dto);
  }

  @Put('portfolio/:id')
  updatePortfolio(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<AddPortfolioDto>) {
    return this.adminService.updatePortfolio(id, dto);
  }

  @Delete('portfolio/:id')
  deletePortfolio(@Param('id', ParseIntPipe) id: number) { return this.adminService.deletePortfolio(id); }
}
