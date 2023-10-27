import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { CommentModel } from "./comment.model";

@Module({
    controllers: [CommentController],
    providers: [CommentService],
    imports: [SequelizeModule.forFeature([CommentModel])],
    exports: [SequelizeModule],
})

export class CommentModule {}