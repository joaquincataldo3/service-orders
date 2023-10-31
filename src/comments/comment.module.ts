import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { CommentModel } from "./comment.model";
import { OrderModel } from "src/order/order.model";
import { OrderModule } from "src/order/order.module";
import { OrderService } from "src/order/order.service";

@Module({
    controllers: [CommentController],
    providers: [CommentService],
    imports: [SequelizeModule.forFeature([CommentModel, OrderModel]), forwardRef(() => OrderModule), OrderService],
    exports: [SequelizeModule],
})

export class CommentModule {}