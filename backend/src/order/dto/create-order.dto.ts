import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsInt()
  @Type(() => Number)
  invitationId: number;
}
