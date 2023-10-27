import { Body, Controller, Get, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/dto";

@Controller('orders')

export class OrderController {

    constructor (private orderService: OrderService) {}

    @Get('all')
    allOrders(){
        return this.orderService.allOrders()
    }

    @Post('create')
    createOrder(@Body() dto: CreateOrderDto){
        console.log(dto)
        return this.orderService.createOrder(dto)
    }

    @Post('update')
    updateOrder(){
        return this.orderService.updateOrder()
    }

}