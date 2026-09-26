import { IsInt, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @IsInt()
  @Type(() => Number)
  orderId: number;

  @IsString()
  @IsNotEmpty()
  provider: string; // 'midtrans' | 'xendit'
}
