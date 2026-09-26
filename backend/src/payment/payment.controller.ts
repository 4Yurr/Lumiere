import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPayment(@Request() req: any, @Body() dto: CreatePaymentDto) {
    return this.paymentService.createPayment(req.user.sub, dto);
  }

  // Webhook — No JWT; gateway calls this directly
  @Post('webhook')
  handleWebhook(@Body() payload: Record<string, any>) {
    return this.paymentService.handleWebhook(payload);
  }
}
