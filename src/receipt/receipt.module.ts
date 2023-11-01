import {Module} from '@nestjs/common';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { ReceiptModel } from './receipt.model';

@Module({
    controllers: [ReceiptController],
    providers: [ReceiptService, JwtStrategy],
    imports: [SequelizeModule.forFeature([ReceiptModel])],
    exports: [SequelizeModule]
})

export class ReceiptModule {}