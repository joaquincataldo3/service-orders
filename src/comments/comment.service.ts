import { Injectable, InternalServerErrorException, NotFoundException, forwardRef, Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CommentModel } from "./comment.model";
import { UpdateCommentDto } from "./dto/dto";
import { CreateCommentDto } from "./dto/dto";
import { UserModel } from "src/user/user.model";
import { OrderService } from "src/order/order.service";
import { RequestSuccess } from "src/utils/global.interfaces";


@Injectable({})

export class CommentService {

    constructor(
        @InjectModel(CommentModel) private commentModel: typeof CommentModel,
        @Inject(forwardRef(() => OrderService)) private orderService: OrderService) { }

    private commentsRelations: string[] = ['user', 'order']

    async getAllCommentsByUser(userId: number): Promise<CommentModel[]> {
        const comments = await this.commentModel.findAll({
            where: {
                user_id: userId
            },
            include: this.commentsRelations
        });
        return comments;
    }

    async getComment(commentId: number) {
        try {
            const commentExists = await this.commentModel.findByPk(commentId);
            if (!commentExists) throw new NotFoundException("Comentario no encontrado");
            const comment = commentExists;
            return comment;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new InternalServerErrorException(`Error in getComment: ${error}`);
        }

    }

    async createComment(dto: CreateCommentDto, userId: number): Promise<CommentModel> {
        const { description, order_id } = dto;
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
    }

    async updateComment(commentId: number, dto: UpdateCommentDto): Promise<RequestSuccess> {
        try {
            const { description } = dto;
            const [affectedCount] = await this.commentModel.update({ description }, {
                where: {
                    id: commentId
                }
            });
            if (affectedCount === 0) {
                throw new NotFoundException('No record was updated');
            }
            return { ok: true }
        } catch (error) {
            throw new InternalServerErrorException(`Error in updateComment: ${error}`);
        }

    }

    async deleteComment(commentId: number): Promise<RequestSuccess> {
        const affectedRows = await this.commentModel.destroy({
            where: {
                id: commentId
            },
            force: true
        });
        if (affectedRows === 0) {
            throw new NotFoundException('No comment was updated')
        }
        return { ok: true };
    }
}