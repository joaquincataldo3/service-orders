import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ClientModel } from "./client.model";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";

@Module({
    controllers: [ClientController],
    providers: [ClientService],
    imports: [SequelizeModule.forFeature([ClientModel])],
    exports: [SequelizeModule]
})

export class ClientModule {}