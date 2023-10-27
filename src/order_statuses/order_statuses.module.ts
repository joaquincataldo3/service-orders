import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { OrderStatusesModel } from "./order_statuses.model";

import { OrderStatusesService } from "./order_statuses.service";
import { OrderStatusesController } from "./order_statuses.controller";

@Module({
    controllers: [OrderStatusesController],
    providers: [OrderStatusesService],
    imports: [SequelizeModule.forFeature([OrderStatusesModel])],
    exports: [SequelizeModule]
})

export class OrderStatusModule {}