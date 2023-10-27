import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { OrderModel } from "./order.model";
import { CreateOrderDto } from "./dto/dto";

Injectable({})

export class OrderService {

    constructor (@InjectModel(OrderModel) private orderModel: typeof OrderModel) {}

    async allOrders(): Promise<OrderModel[]> {
        return this.orderModel.findAll()
    }

    createOrder (dto: CreateOrderDto) {
        console.log(dto)
        return "create order !"
    }

    updateOrder () {
        return "update order !"
    }
}