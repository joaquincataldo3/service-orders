import { Body, Controller, Get, Post, Req, UseGuards,  Put, HttpCode, Param, Query } from "@nestjs/common";
import { OrderService } from "./order.service";
import { ChangeOrderStatusDto, CreateOrderDto } from "./dto/dto";
import { AuthGuard } from "@nestjs/passport";
import {Request} from 'express';
import { jwtGuardId } from "src/auth/utils/utils";
import { GetUserDecorator } from "src/user/custom-decorators/getUser";
import { UserModel } from "src/user/user.model";
import { OrderModel } from "./order.model";
import { ApiParam, ApiTags } from "@nestjs/swagger";


// swagger tag Orders
@ApiTags('Orders')

// all routes protected by authguard
@UseGuards(AuthGuard(jwtGuardId))

// /orders prefix
@Controller('orders')

export class OrderController {

    constructor (private orderService: OrderService) {}

    @Get('all')
    async allOrders(@Query('orderStatus') orderStatus: string): Promise<OrderModel[]>{
        const status = orderStatus ? orderStatus : '';
        return await this.orderService.allOrders(status)
    }

    @ApiParam({
        name: 'orderId'
    })
    @Get('/:orderId')
    async getOrder(@Param() orderId: string): Promise<OrderModel> {
        return await this.orderService.getOrder(orderId);
    }

    @Post('create')
    @HttpCode(201)
    async createOrder(@Body() dto: CreateOrderDto, @GetUserDecorator() user: UserModel): Promise<OrderModel>{
        // el objeto del user esta presente en el objeto de req
        // esto es proporcionado por el middleware de la estrategia
        return await this.orderService.createOrder(dto, user);
    }

    @Put('change-status')
    async changeOrderStatus (@Body() dto: ChangeOrderStatusDto, @GetUserDecorator() user: UserModel): Promise<boolean> {
        return await this.orderService.changeOrderStatus(dto, user); 
    }

   
}