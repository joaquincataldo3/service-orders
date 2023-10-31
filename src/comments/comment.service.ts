import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CommentModel } from "./comment.model";
import { UpdateCommentDto } from "./dto/dto";
import { createCommentDto } from "./dto/dto";
import { OrderModel } from "src/order/order.model";
import { UserModel } from "src/user/user.model";

@Injectable({})

export class CommentService {

    constructor(@InjectModel(CommentModel) private commentModel: typeof CommentModel, @InjectModel(OrderModel) private orderModel: typeof OrderModel) {}

    async getComment (commentId: string) {
        const commentExists = await this.commentModel.findByPk(commentId);
        if (!commentExists) throw new NotFoundException("Comentario no encontrado");
        const comment = commentExists;
        return comment;
    }


    async createComment(dto: createCommentDto, user: UserModel) {
        try {
            const {description, order_id} = dto;
            const order = await this.orderModel.findByPk(order_id)
            if (!order) throw new NotFoundException('Orden no encontrada');
            const objectToDb = {
                description,
                order_id
            }
            await this.commentModel.create(objectToDb);
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