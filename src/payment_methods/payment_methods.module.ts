import {Module} from '@nestjs/common';
import { PaymentMethodController } from './payment_methods.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    controllers: [PaymentMethodController],
    providers: [PaymentMethodController],
    imports: [SequelizeModule.forFeature([PaymentMethodModule])],
    exports: [SequelizeModule]
})

export class PaymentMethodModule {}