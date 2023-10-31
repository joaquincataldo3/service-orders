import { Module, forwardRef } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { OrderModel } from "./order.model";
import { JwtStrategy } from "src/auth/strategy/jwt.strategy";
import { UserModel } from "src/user/user.model";
import { UserModule } from "src/user/user.module";
import { ClientModel } from "src/client/client.model";
import { ClientModule } from "src/client/client.module";
import { CommentModel } from "src/comments/comment.model";
import { CommentModule } from "src/comments/comment.module";
import { OrderStatusesModel } from "src/order_statuses/order_statuses.model";
import { OrderStatusModule } from "src/order_statuses/order_statuses.module";
import { WorkDoneModel } from "src/work_done/work_done.model";
import { WorkDoneModule } from "src/work_done/work_done.module";

@Module({
    controllers: [OrderController],
    providers: [OrderService, JwtStrategy],
    imports: 
    [SequelizeModule.forFeature([OrderModel, UserModel, ClientModel, CommentModel, OrderStatusesModel, WorkDoneModel]),
     UserModule, ClientModule, forwardRef(() => CommentModule), OrderStatusModule, WorkDoneModule],
    exports: [SequelizeModule]
})

export class OrderModule {}