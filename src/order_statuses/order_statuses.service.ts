import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { OrderStatusesModel } from "./order_statuses.model";


@Injectable({})

export class OrderStatusesService {

    constructor(@InjectModel(OrderStatusesModel) private orderStatusModel: typeof OrderStatusesModel) {}

    async getStatus(statusId: number){
        try {
            const selectedStatus = await this.orderStatusModel.findByPk(statusId);
            if(!selectedStatus) {
                throw new NotFoundException('Order status not found');
            }
            return selectedStatus;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new InternalServerErrorException();
        }
      
    } 

}


