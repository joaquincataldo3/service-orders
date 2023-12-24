import { Inject, Injectable, InternalServerErrorException, NotFoundException, forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { OrderModel } from "./order.model";
import { ChangeOrderStatusDto, CreateOrderDto } from "./dto/dto";
import { UserModel } from "src/user/user.model";
import { GetUserDecorator } from "src/user/custom-decorators/getUser";
import { ClientService } from "src/client/client.service";
import { CommentService } from "src/comments/comment.service";
import { OrderStatusesService } from "src/order_statuses/order_statuses.service";
import { RequestSuccess } from "src/utils/global.interfaces";

Injectable({})

export class OrderService {

    constructor
        (@InjectModel(OrderModel) private orderModel: typeof OrderModel,
            @Inject(forwardRef(() => CommentService)) private commentService: CommentService,
            private clientService: ClientService,
            private orderStatusesService: OrderStatusesService) { }

    private orderRelations: string[] = ['createdBy', 'client', 'orderStatus', 'updatedBy']
            

    async allOrders(page: number): Promise<OrderModel[]> {
        const limit = 5;
        const offset = limit * (page - 1);
        return this.orderModel.findAll({
            include: this.orderRelations,
            limit,
            offset
        })
    }

    async allOrdersByUser(page: number, userId: string): Promise<OrderModel[]> {
        const limit = 5;
        const offset = limit * (page - 1);
        console.log(userId)
        return this.orderModel.findAll({
            where: {
                created_by_id: userId
            },
            include: this.orderRelations,
            limit,
            offset
        })
    }


    async getOrder(orderId: number) {
        const order: OrderModel = await this.orderModel.findByPk(orderId, {
            include: this.orderRelations
        });
        if (!order) throw new NotFoundException("Order not found")
        return order;
    }


    async createOrder(dto: CreateOrderDto, activeUser: UserModel) {
        const { entry, device, code, first_name, last_name } = dto;
        const { id } = activeUser;
        const deviceLower = device.toLowerCase();
        const clientId: number = await this.clientService.getClientId(first_name, last_name)
        const orderObjectToDb = {
            entry,
            device: deviceLower,
            code,
            client_id: clientId,
            created_by_id: id,
            order_status_id: 1,
            createdAt: Date.now(),
            updatedAt: null,
            deletedAt: null
        }
        const newOrder = await this.orderModel.create(orderObjectToDb);
        return newOrder;
    }

    async changeOrderStatus(dto: ChangeOrderStatusDto, userId: number): Promise<RequestSuccess> {
        const { status_id, order_id } = dto;
        const selectedStatus = await this.orderStatusesService.getStatus(status_id);
        const [affectedCount] = await this.orderModel.update({
            order_status_id: status_id
        }, {
            where: {
                id: order_id
            }
        })
        if (affectedCount == 0) throw new NotFoundException(`No data was updated with the id: ${order_id}`);
        const createCommentDto = {
            description: `Estado de orden cambiado a ${selectedStatus.status}`,
            order_id: Number(order_id)
        }
        await this.commentService.createComment(createCommentDto, userId)
        return { ok: true };
    }

    async updateDateOfUpdate(orderId: number, @GetUserDecorator() userId: number): Promise<boolean> {
        try {
            const currentDate = new Date();

            const [affectedCount] = await this.orderModel.update(
                {
                    updatedAt: currentDate,
                    last_updated_by_id: userId
                },
                {
                    where: {
                        id: orderId
                    }
                }
            );
            if (affectedCount === 0) {
                throw new NotFoundException(`No data was updated with id: ${userId}`);
            }
            return true;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new InternalServerErrorException(`Error in updateDateOfUpdate: ${error}`);
        }

    }

}