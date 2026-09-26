import { IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateInvitationDto {
  @IsObject()
  @IsOptional()
  data?: Record<string, any>;

  @IsString()
  @IsOptional()
  slug?: string;
}
