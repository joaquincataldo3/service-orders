import { Injectable } from "@nestjs/common";
import { UserModel } from "src/user/user.model";
import { CreateWorkDoneDto } from "./dto/dto";
import { WorkDoneModel } from "./work_done.model";
import { InjectModel } from "@nestjs/sequelize";
import { OrderService } from "src/order/order.service";
import { ChangeOrderStatusDto } from "src/order/dto/dto";

@Injectable({})

export class WorkDoneService {

    constructor (
        @InjectModel(WorkDoneModel) private workDoneModel : typeof WorkDoneModel,
        private orderService: OrderService
        ) {}

    async createWorkDone(userId: number, dto: CreateWorkDoneDto){
            const {description, orderId, isReadyToPickUp} = dto;
            const workDoneObject = {
                description,
                order_id: orderId,
                user_id: userId,
                createdAt: Date.now(),
                edited: false
            };
            if(isReadyToPickUp == 1) {
                const changeOrderStatusDto: ChangeOrderStatusDto = {
                    status_id: 3,
                    order_id: 2,
                }
                this.orderService.changeOrderStatus(changeOrderStatusDto, userId)
            }
            const workDone = await this.workDoneModel.create(workDoneObject);
            return workDone;
    }

}