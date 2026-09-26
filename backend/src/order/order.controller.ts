import { Controller, Post, Get, Param, Body, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateOrderDto) {
    return this.orderService.create(req.user.sub, dto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.orderService.findAllByUser(req.user.sub);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id, req.user.sub);
  }
}
