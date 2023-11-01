  import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CommentModel } from "./comment.model";
import { UpdateCommentDto } from "./dto/dto";
import { createCommentDto } from "./dto/dto";
import { UserModel } from "src/user/user.model";
import { OrderService } from "src/order/order.service";


@Injectable({})

export class CommentService {

    constructor(
        @InjectModel(CommentModel) private commentModel: typeof CommentModel,
        private orderService: OrderService) {}

    async getComment (commentId: string) {
        const commentExists = await this.commentModel.findByPk(commentId);
        if (!commentExists) throw new NotFoundException("Comentario no encontrado");
        const comment = commentExists;
        return comment;
    }


    async createComment(dto: createCommentDto, user: UserModel) {
        try {
            const {description, order_id} = dto;
            const order = await this.orderService.getOrder(order_id);
            if (!order) throw new NotFoundException('Orden no encontrada');
            const objectToDb = {
                description,
                order_id
            }
            const comment = await this.commentModel.create(objectToDb);
            const userId = user.id;
            await this.orderService.updateDateOfUpdate(order_id, userId);
            return comment;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(`Error en createComment: ${error}`);
        }
       
    }

    async updateComment(commentId: string, dto: UpdateCommentDto) {
        await this.getComment(commentId);
        const {description} = dto;
        await this.commentModel.update({description}, {
            where: {
                id: commentId
            }
        });
    }

    async deleteComment(commentId: string) {
        try {
            await this.getComment(commentId);
            await this.commentModel.destroy({
                where: {
                    id: commentId
                },
                force: true
            });
            return commentId;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(`Error mientras se eliminaba un comentario: ${error}`);
        }
    }
}