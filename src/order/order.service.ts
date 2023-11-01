import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { OrderModel } from "./order.model";
import { ChangeOrderStatusDto, CreateOrderDto} from "./dto/dto";
import { UserModel } from "src/user/user.model";
import { ClientModel } from "src/client/client.model";
import { CommentModel } from "src/comments/comment.model";
import { OrderStatusesModel } from "src/order_statuses/order_statuses.model";
import { GetUserDecorator } from "src/user/custom-decorators/getUser";
import { ClientService } from "src/client/client.service";
import { CommentService } from "src/comments/comment.service";

Injectable({})

export class OrderService {

    constructor
    (@InjectModel(OrderModel) private orderModel: typeof OrderModel, 
    @InjectModel(UserModel) private userModel: typeof UserModel,
    @InjectModel(OrderStatusesModel) private orderStatusesModel: typeof OrderStatusesModel,
    private clientService: ClientService,
    private commentService: CommentService) { }

    async allOrders(): Promise<OrderModel[]> {
        return this.orderModel.findAll({
            include: ['createdBy', 'client', 'orderStatus']
        })
    }

    async getOrder (orderId: string) {
        try {
            const order: OrderModel = await this.orderModel.findByPk(orderId)
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
            const userExistsInDb = await this.userModel.findByPk(id);
            if(!userExistsInDb){
                throw new ForbiddenException('Usuario no encontrado mientras se creaba una orden')
            }
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
        const {id} = user;
        const {status_id, order_id} = dto; 
        const selectedStatus = await this.orderStatusesModel.findByPk(status_id);
        if(!selectedStatus) {
            throw new NotFoundException('Order status no encontrado');
        }
        const orderUpdated = await this.orderModel.update({
            order_status_id: status_id
        }, {
            where: {
                id: order_id
            }
        })
        const [affectedCount]: [number] = orderUpdated
        if (affectedCount == 0) throw new NotFoundException('La orden no fue encontrada y actualizada')
        const createCommentDto = {description: `Estado de orden cambiado a ${selectedStatus.status}`, order_id}
        await this.commentService.createComment(createCommentDto, user)
        return true;
    }   

    async updateDateOfUpdate(orderId: string, @GetUserDecorator() userId: number) {
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