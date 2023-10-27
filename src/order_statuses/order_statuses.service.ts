import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { OrderStatusesModel } from "./order_statuses.model";

@Injectable({})

export class OrderStatusesService {

    constructor (@InjectModel(OrderStatusesModel) private orderStatusesModel: typeof OrderStatusesModel) {}

    allStatuses () {
        return "All statuses"
    }
}