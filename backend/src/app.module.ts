import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { TemplateModule } from './template/template.module';
import { InvitationModule } from './invitation/invitation.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { PhotographerModule } from './photographer/photographer.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    UserModule,
    AuthModule,
    CategoryModule,
    TemplateModule,
    InvitationModule,
    OrderModule,
    PaymentModule,
    PhotographerModule,
    AdminModule,
  ],
})
export class AppModule {}
