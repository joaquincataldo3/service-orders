import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientModule } from './client/client.module';
import { CommentModule } from './comments/comment.module';
import { WorkDoneModule } from './work_done/work_done.module';
import { OrderStatusModule } from './order_statuses/order_statuses.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './sequelize/database.config';
import { AuthModule } from './auth/auth.module';
import { GuaranteeModule } from './guarantees/guarantee.module';
import { ReceiptModule } from './receipt/receipt.module';
import { PaymentMethodModule } from './payment_methods/payment_methods.module';
import { PdfGeneratorModule } from './pdf_generator/pdf_generator.module';
import { WelcomeModule } from './welcome/welcome.module';

@Module({
  imports: [
    // el config module para usar las variables de entorno globalmente
    ConfigModule.forRoot({isGlobal: true}),
    OrderModule,
    ClientModule,
    UserModule, 
    CommentModule,
    WorkDoneModule,
    OrderStatusModule,
    AuthModule,
    GuaranteeModule,
    ReceiptModule,
    PaymentMethodModule,
    PdfGeneratorModule,
    WelcomeModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => databaseConfig(configService)
    }),],
})

export class AppModule {}

