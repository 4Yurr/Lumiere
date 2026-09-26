import { Module } from '@nestjs/common';
import { PhotographerController } from './photographer.controller';
import { PhotographerService } from './photographer.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PhotographerController],
  providers: [PhotographerService],
  exports: [PhotographerService],
})
export class PhotographerModule {}
