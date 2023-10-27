import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { WorkDoneController } from "./work_done.controller";
import { WorkDoneService } from "./work_done.service";
import { WorkDoneModel } from "./work_done.model";

@Module({
    controllers: [WorkDoneController],
    providers: [WorkDoneService],
    imports: [SequelizeModule.forFeature([WorkDoneModel])],
    exports: [SequelizeModule]
})

export class WorkDoneModule {

}