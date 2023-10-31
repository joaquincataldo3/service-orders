import { Injectable } from "@nestjs/common";
import { UserModel } from "src/user/user.model";
import { CreateWorkDoneDto } from "./dto/dto";
import { WorkDoneModel } from "./work_done.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable({})

export class WorkDoneService {

    constructor (@InjectModel(WorkDoneModel) private workDoneModel : typeof WorkDoneModel) {}

    async createWorkDone(orderId: string, activeUser: UserModel, dto: CreateWorkDoneDto){
            const {id} = activeUser;
            const {description} = dto;
            const workDoneObject = {
                description,
                order_id: orderId,
                user_id: id,
                createdAt: Date.now(),
                edited: false
            }
            await this.workDoneModel.create(workDoneObject)
    }

}