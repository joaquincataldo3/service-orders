import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ClientModel } from "./client.model";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";
import { JwtStrategy } from "src/auth/strategy/jwt.strategy";

@Module({
    controllers: [ClientController],
    providers: [ClientService, JwtStrategy],
    imports: [SequelizeModule.forFeature([ClientModel])],
    exports: [SequelizeModule, ClientService]
})

export class ClientModule {}