import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateWorkDoneDto, UpdateWorkDoneDto } from "./dto/dto";
import { WorkDoneModel } from "./work_done.model";
import { InjectModel } from "@nestjs/sequelize";
import { OrderService } from "src/order/order.service";
import { ChangeOrderStatusDto } from "src/order/dto/dto";
import { UserService } from "src/user/user.service";
import { RequestSuccess } from "src/utils/global.interfaces";

@Injectable({})

export class WorkDoneService {

    constructor(
        @InjectModel(WorkDoneModel) private workDoneModel: typeof WorkDoneModel,
        private orderService: OrderService,
        private usersService: UserService
    ) { }

    async getWorksDoneByUser(userId: number) {
        await this.usersService.getOneUserById(userId);
        const worksDone = await this.workDoneModel.findAll({
            where: {
                user_id: userId
            }
        })
        return worksDone;
    }

    async createWorkDone(userId: number, dto: CreateWorkDoneDto): Promise<WorkDoneModel> {
        const { description, orderId, isReadyToPickUp } = dto;
        const workDoneObject = {
            description,
            order_id: orderId,
            user_id: userId,
            createdAt: Date.now(),
            edited: false
        };
        if (isReadyToPickUp == 1) {
            const changeOrderStatusDto: ChangeOrderStatusDto = {
                status_id: 3,
                order_id: 2,
            }
            this.orderService.changeOrderStatus(changeOrderStatusDto, userId)
        }
        const workDone = await this.workDoneModel.create(workDoneObject);
        return workDone;
    }

    async updateWorkDone(dto: UpdateWorkDoneDto): Promise<RequestSuccess> {
        const { description, workDoneId} = dto;
        const [affectedCount] = await this.workDoneModel.update({ description, edited: 1}, {
            where: {
                id: workDoneId
            }
        });
        if (affectedCount === 0) {
            throw new NotFoundException('No record was updated');
        }
        return { ok: true }
    }

}