import { ForbiddenException, Inject, Injectable, InternalServerErrorException, NotFoundException, forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { OrderModel } from "./order.model";
import { ChangeOrderStatusDto, CreateOrderDto } from "./utils/dto";
import { UserModel } from "src/user/user.model";
import { ClientModel } from "src/client/client.model";
import { CommentModel } from "src/comments/comment.model";
import { OrderStatusesModel } from "src/order_statuses/order_statuses.model";
import { GetUserDecorator } from "src/user/custom-decorators/getUser";
import { ClientService } from "src/client/client.service";
import { CommentService } from "src/comments/comment.service";
import { OrderStatusesService } from "src/order_statuses/order_statuses.service";

Injectable({})

export class OrderService {

    constructor
        (@InjectModel(OrderModel) private orderModel: typeof OrderModel,
            @InjectModel(UserModel) private userModel: typeof UserModel,
            @Inject(forwardRef(() => CommentService)) private commentService: CommentService,
            private clientService: ClientService,
            private orderStatusesService: OrderStatusesService) { }

    async allOrders(orderStatus: string | ''): Promise<OrderModel[]> {
        if (orderStatus) {
            await this.orderStatusesService.getStatus(orderStatus);
            return this.orderModel.findAll({
                include: ['createdBy', 'client', 'orderStatus'],
                where: {
                    order_status_id: orderStatus
                }
            })
        }
        return this.orderModel.findAll({
            include: ['createdBy', 'client', 'orderStatus'],

        })
    }

    async getOrder(orderId: string) {
        try {
            const order: OrderModel = await this.orderModel.findByPk(orderId, {
                include: ['createdBy', 'updatedBy', 'client']
            });
            if (!order) throw new NotFoundException("Orden no encontrada")
            return order;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(`Error en getOrder: ${error}`);
        }
    }


    async createOrder(dto: CreateOrderDto, activeUser: UserModel) {
        try {
            const { entry, device, code, first_name, last_name } = dto;
            const { id } = activeUser;
            console.log(id);
            const clientId: number = await this.clientService.getClientId(first_name, last_name)
            const orderObjectToDb = {
                entry,
                device,
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
        } catch (error) {
            console.log('Error creando una orden: ' + error)
            throw new InternalServerErrorException('Error creando una orden')
        }

    }

    async changeOrderStatus(dto: ChangeOrderStatusDto, user: UserModel) {
        const { id } = user;
        const { status_id, order_id } = dto;
        const selectedStatus = await this.orderStatusesService.getStatus(status_id);
        const orderUpdated = await this.orderModel.update({
            order_status_id: status_id
        }, {
            where: {
                id: order_id
            }
        })
        const [affectedCount]: [number] = orderUpdated
        if (affectedCount == 0) throw new NotFoundException('La orden no fue encontrada y actualizada')
        const createCommentDto = { description: `Estado de orden cambiado a ${selectedStatus.status}`, order_id }
        await this.commentService.createComment(createCommentDto, user)
        return true;
    }

    async updateDateOfUpdate(orderId: string, @GetUserDecorator() userId: number): Promise<boolean> {
        const orderUpdated = await this.orderModel.update({
            updatedAt: Date.now(),
            last_updated_by: userId
        }, {
            where: {
                id: orderId
            }
        })
        const [affectedCount]: [number] = orderUpdated;
        if (affectedCount == 0) throw new NotFoundException('updateDateOfUpdate: No se encontró la orden')
        return true;
    }

}