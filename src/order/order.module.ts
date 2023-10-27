import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { OrderModel } from "./order.model";

@Module({
    controllers: [OrderController],
    providers: [OrderService],
    imports: [SequelizeModule.forFeature([OrderModel])],
    exports: [SequelizeModule]
})

export class OrderModule {}