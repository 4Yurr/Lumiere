import { IsInt, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvitationDto {
  @IsInt()
  @Type(() => Number)
  templateId: number;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsObject()
  data: Record<string, any>;
}
