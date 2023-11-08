
import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { OrderModel } from 'src/order/order.model';
import { UserModel } from 'src/user/user.model';
import { ClientModel } from 'src/client/client.model';
import { OrderStatusesModel } from 'src/order_statuses/order_statuses.model';
import { CommentModel } from 'src/comments/comment.model';
import { WorkDoneModel } from 'src/work_done/work_done.model';
import { ReceiptModel } from 'src/receipt/receipt.model';
import { GuaranteeModel } from 'src/guarantees/guarantee.model';
import { PaymentMethodModel } from 'src/payment_methods/payment_methods.model';

export const databaseConfig = (configService: ConfigService): SequelizeModuleOptions => {

  const nodeEnv = configService.get<string>('NODE_ENV');

  const host = configService.get<string>('DB_HOST');
  const port = configService.get<number>('DB_PORT');
  const username = configService.get<string>('DB_USERNAME');
  const password = nodeEnv != 'development' ? configService.get<string>('DB_PASSWORD') : null;
  const database = configService.get<string>('DB_DATABASE');

  return {
    dialect: 'mysql',
    host,
    port,
    username,
    password,
    database,
    models: [OrderModel, UserModel, OrderStatusesModel, ClientModel, CommentModel, WorkDoneModel, ReceiptModel, GuaranteeModel, PaymentMethodModel]
  };
}
 