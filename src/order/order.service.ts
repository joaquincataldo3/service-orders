import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { OrderModel } from "./order.model";
import { ChangeOrderStatusDto, CreateOrderDto, CreateWorkDoneDto, createCommentDto } from "./dto/dto";
import { UserModel } from "src/user/user.model";
import { ClientModel } from "src/client/client.model";
import { CommentModel } from "src/comments/comment.model";
import {Request} from 'express';
import { OrderStatusesModel } from "src/order_statuses/order_statuses.model";
import { WorkDoneModel } from "src/work_done/work_done.model";

Injectable({})

export class OrderService {

    constructor
    (@InjectModel(OrderModel) private orderModel: typeof OrderModel, 
    @InjectModel(UserModel) private userModel: typeof UserModel,
    @InjectModel(ClientModel) private clientModel: typeof ClientModel,
    @InjectModel(CommentModel) private commentModel: typeof CommentModel,
    @InjectModel(OrderStatusesModel) private orderStatusesModel: typeof OrderStatusesModel,
    @InjectModel(WorkDoneModel) private workDoneModel: typeof WorkDoneModel) { }

    async allOrders(): Promise<OrderModel[]> {
        return this.orderModel.findAll({
            include: ['createdBy', 'client', 'orderStatus']
        })
    }

    async getClientId(first_name: string, last_name: string): Promise<number> {
        const clientExistsInDb = await this.clientModel.findOne({
            where: {
                first_name,
                last_name
            }
        })
        if (clientExistsInDb) {
            const client = clientExistsInDb;
            const clientId = client.id;
            return clientId;
        } else {
            const clientObjectToDb = {
                first_name,
                last_name
            };
            const newClient = await this.clientModel.create(clientObjectToDb);
            const clientId = newClient.id;
            return clientId;
        }
    }

    async createOrder(dto: CreateOrderDto, userInReq: any) {
        try {
            const { entry, device, code, first_name, last_name } = dto;
            const { id } = userInReq;
            const userExistsInDb = await this.userModel.findByPk(id);
            if(!userExistsInDb){
                throw new ForbiddenException('Usuario no encontrado mientras se creaba una orden')
            }
            const user = userExistsInDb;
            const clientId: number = await this.getClientId(first_name, last_name)
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

    async createCommentInOrder() {

    }

    async updateOrder(dto: createCommentDto, userInReq: any) {
        try {
            const {id} = userInReq;
            const commentObject = {
                description: dto.description,
                user_id: id,
                edited: false,
                createdAt: Date.now()
            };
            const newComment = await this.commentModel.create(commentObject);
            return newComment;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(`Error creando un comentario en una orden: ${error}`);
        }
    }

    async changeOrderStatus(userInReq: any, dto: ChangeOrderStatusDto) {
        const {id} = userInReq;
        const {status_id, order_id} = dto; 
        const selectedStatus = await this.orderStatusesModel.findByPk(status_id);
        if(!selectedStatus) {
            throw new NotFoundException('Order status no encontrado');
        }
        await this.orderModel.update({
            order_status_id: status_id
        }, {
            where: {
                id: order_id
            }
        })
        await this.commentModel.create({
            description: `Estado de orden cambiado a ${selectedStatus.status}`,
            user_id: id,
            order_id
        })
    }   

    async createWorkDoneInOrder(userInReq: any, dto: CreateWorkDoneDto) {
        const {id} = userInReq;
        const {description, order_id} = dto;
        const workDoneObject = {
            description,
            order_id,
            user_id: id,
            createdAt: Date.now(),
            edited: false
        }
        await this.workDoneModel.create()
    }
}