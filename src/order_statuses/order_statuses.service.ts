import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { OrderStatusesModel } from "./order_statuses.model";


@Injectable({})

export class OrderStatusesService {

    constructor(@InjectModel(OrderStatusesModel) private orderStatusModel: typeof OrderStatusesModel) {}

    async getStatus(statusId: string){
        const selectedStatus = await this.orderStatusModel.findByPk(statusId);
        if(!selectedStatus) {
            throw new NotFoundException('Order status no encontrado');
        }
        return selectedStatus;
    } 

}


