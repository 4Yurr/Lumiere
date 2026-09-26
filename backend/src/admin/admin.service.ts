import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InvitationStatus, UserStatus } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Users ──────────────────────────────────────────────────────────────────

  getUsers() {
    return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }

  getUser(id: number) {
    return this.prisma.user.findUnique({ where: { id }, include: { invitations: true } });
  }

  setUserStatus(id: number, status: UserStatus) {
    return this.prisma.user.update({ where: { id }, data: { status } });
  }

  // ── Templates ─────────────────────────────────────────────────────────────

  getTemplates() {
    return this.prisma.template.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } });
  }

  getTemplate(id: number) {
    return this.prisma.template.findUnique({ where: { id }, include: { category: true } });
  }

  createTemplate(data: any) {
    return this.prisma.template.create({ data });
  }

  updateTemplate(id: number, data: any) {
    return this.prisma.template.update({ where: { id }, data });
  }

  deleteTemplate(id: number) {
    return this.prisma.template.delete({ where: { id } });
  }

  // ── Invitations ───────────────────────────────────────────────────────────

  getInvitations() {
    return this.prisma.invitation.findMany({
      include: { user: true, template: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  getInvitation(id: number) {
    return this.prisma.invitation.findUnique({ where: { id }, include: { user: true, template: true } });
  }

  setInvitationStatus(id: number, status: InvitationStatus) {
    return this.prisma.invitation.update({ where: { id }, data: { status } });
  }

  // ── Orders ────────────────────────────────────────────────────────────────

  getOrders() {
    return this.prisma.order.findMany({
      include: { user: true, invitation: true, payments: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  getOrder(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { user: true, invitation: true, payments: true },
    });
  }

  // ── Payments ──────────────────────────────────────────────────────────────

  getPayments() {
    return this.prisma.payment.findMany({
      include: { order: { include: { user: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  getPayment(id: number) {
    return this.prisma.payment.findUnique({ where: { id }, include: { order: true } });
  }

  // ── Photographers ─────────────────────────────────────────────────────────

  getPhotographers() {
    return this.prisma.photographer.findMany({ include: { category: true }, orderBy: { name: 'asc' } });
  }

  getPhotographer(id: number) {
    return this.prisma.photographer.findUnique({
      where: { id },
      include: { category: true, portfolios: true },
    });
  }

  createPhotographer(data: any) {
    return this.prisma.photographer.create({ data, include: { category: true } });
  }

  updatePhotographer(id: number, data: any) {
    return this.prisma.photographer.update({ where: { id }, data });
  }

  deletePhotographer(id: number) {
    return this.prisma.photographer.delete({ where: { id } });
  }

  // ── Portfolio ─────────────────────────────────────────────────────────────

  getPortfolio(photographerId: number) {
    return this.prisma.photographerPortfolio.findMany({
      where: { photographerId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  addPortfolio(photographerId: number, data: any) {
    return this.prisma.photographerPortfolio.create({ data: { photographerId, ...data } });
  }

  updatePortfolio(id: number, data: any) {
    return this.prisma.photographerPortfolio.update({ where: { id }, data });
  }

  deletePortfolio(id: number) {
    return this.prisma.photographerPortfolio.delete({ where: { id } });
  }
}
