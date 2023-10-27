import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderModel } from './order/order.model';
import { UserModel } from './user/user.model';
import { OrderStatusesModel } from './order_statuses/order_statuses.model';
import { ClientModel } from './client/client.model';
import { CommentModel } from './comments/comment.model';
import { WorkDoneModel } from './work_done/work_done.model';
import { ClientModule } from './client/client.module';
import { CommentModule } from './comments/comment.module';
import { WorkDoneModule } from './work_done/work_done.module';
import { OrderStatusModule } from './order_statuses/order_statuses.module';

@Module({
  imports: [
    OrderModule,
    ClientModule,
    UserModule, 
    CommentModule,
    WorkDoneModule,
    OrderStatusModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: null,
      database: 'service_orders',
      models: [OrderModel, UserModel, OrderStatusesModel, ClientModel, CommentModel, WorkDoneModel],
    }),],
})

export class AppModule {}

