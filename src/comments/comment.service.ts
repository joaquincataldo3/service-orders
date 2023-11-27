  import { Injectable, InternalServerErrorException, NotFoundException, forwardRef, Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CommentModel } from "./comment.model";
import { UpdateCommentDto } from "./dto/dto";
import { CreateCommentDto } from "./dto/dto";
import { UserModel } from "src/user/user.model";
import { OrderService } from "src/order/order.service";


@Injectable({})

export class CommentService {

    constructor(
        @InjectModel(CommentModel) private commentModel: typeof CommentModel,
        @Inject(forwardRef(() => OrderService)) private orderService: OrderService) {}

        
    async getAllComments(): Promise<CommentModel[]> {
        const comments = await this.commentModel.findAll();
        return comments;
    }

    async getComment (commentId: string) {
        const commentExists = await this.commentModel.findByPk(commentId);
        if (!commentExists) throw new NotFoundException("Comentario no encontrado");
        const comment = commentExists;
        return comment;
    }


    async createComment(dto: CreateCommentDto, userId: number): Promise<CommentModel> {
        try {
            const {description, order_id} = dto;
            // si pasa es porque encontró la orden
            await this.orderService.getOrder(order_id);
            const objectToDb = {
                description,
                order_id,
                edited: 0,
                user_id: userId,
                createdAt: Date.now()
            }
            const comment = await this.commentModel.create(objectToDb);

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