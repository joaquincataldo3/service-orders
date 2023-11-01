import {Module} from '@nestjs/common';
import { GuaranteeController } from './guarantees.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GuaranteeService } from './guarantee.service';

@Module({
    controllers: [GuaranteeController],
    providers: [GuaranteeService],
    imports: [SequelizeModule.forFeature([GuaranteeModule])],
    exports: [SequelizeModule]
})


export class GuaranteeModule {}