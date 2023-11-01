import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { CommentModel } from "./comment.model";
import { OrderModel } from "src/order/order.model";
import { OrderModule } from "src/order/order.module";
import { JwtStrategy } from "src/auth/strategy/jwt.strategy";

@Module({
    controllers: [CommentController],
    providers: [CommentService, JwtStrategy],
    imports: [SequelizeModule.forFeature([CommentModel, OrderModel]), forwardRef(() => OrderModule)],
    exports: [SequelizeModule, CommentService],
})

export class CommentModule {}