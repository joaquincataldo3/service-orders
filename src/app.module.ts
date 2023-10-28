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
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => databaseConfig(configService)
    }),],
})

export class AppModule {}

