import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { WorkDoneController } from "./work_done.controller";
import { WorkDoneService } from "./work_done.service";
import { WorkDoneModel } from "./work_done.model";
import { OrderModel } from "src/order/order.model";
import { OrderModule } from "src/order/order.module";


@Module({
    controllers: [WorkDoneController],
    providers: [WorkDoneService],
    imports: [SequelizeModule.forFeature([WorkDoneModel, OrderModel]), OrderModule],
    exports: [SequelizeModule]
})

export class WorkDoneModule {

}