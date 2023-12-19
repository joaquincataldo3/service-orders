
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
import { dialect, devNodeEnv, dbPort, devHostEnv, devUserEnv, devPasswordEnv, devDatabaseEnv, prodHostEnv, prodUserEnv, prodPasswordEnv, prodDatabaseEnv, devEnvironment } from 'src/utils/database.constants';

export const databaseConfig = (configService: ConfigService): SequelizeModuleOptions => {

  const nodeEnv = configService.get<string>(devNodeEnv);
  const host = configService.get<string>(`${nodeEnv === devEnvironment ? devHostEnv : prodHostEnv}`);
  const username = configService.get<string>(`${nodeEnv === devEnvironment ? devUserEnv : prodUserEnv}`);
  const password =  configService.get<string>(`${nodeEnv === devEnvironment ? devPasswordEnv : prodPasswordEnv}`);
  const database = configService.get<string>(`${nodeEnv === devEnvironment ? devDatabaseEnv : prodDatabaseEnv}`);
  const port = configService.get<number>(dbPort);

  return {
    dialect ,
    host,
    port,
    username,
    password,
    database,
    models: [OrderModel, UserModel, OrderStatusesModel, ClientModel, CommentModel, WorkDoneModel, ReceiptModel, GuaranteeModel, PaymentMethodModel]
  };
}
 