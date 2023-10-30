import { Body, Controller, Get, Post, Req, UseGuards,  Put, HttpCode } from "@nestjs/common";
import { OrderService } from "./order.service";
import { ChangeOrderStatusDto, CreateOrderDto, CreateWorkDoneDto, createCommentDto } from "./dto/dto";
import { AuthGuard } from "@nestjs/passport";
import {Request} from 'express';
import { jwtGuardId } from "src/utils/utils";

@Controller('orders')

export class OrderController {

    constructor (private orderService: OrderService) {}

    @UseGuards(AuthGuard(jwtGuardId))
    @Get('all')
    allOrders(){
        return this.orderService.allOrders()
    }

    @UseGuards(AuthGuard(jwtGuardId))
    @Post('create')
    @HttpCode(201)
    createOrder(@Body() dto: CreateOrderDto, @Req() req: Request){
        // el objeto del user esta presente en el objeto de req
        // esto es proporcionado por el middleware de la estrategia
        const userInReq = req.user;
        return this.orderService.createOrder(dto, userInReq);
    }

    @UseGuards(AuthGuard(jwtGuardId))
    @Post('create-comment')
    @HttpCode(201)
    async updateOrder(@Body() dto: createCommentDto, @Req() req: Request){
        const userInReq = req.user; 
        return await this.orderService.updateOrder(dto, userInReq);  
    }

    @UseGuards(AuthGuard(jwtGuardId))
    @Post('create-work-done') 
    async createWorkDone (@Req() req: Request, dto: CreateWorkDoneDto) {
        const {user} = req;
        return await this.orderService.createWorkDoneInOrder(user, dto);
    }

    @UseGuards(AuthGuard(jwtGuardId))
    @Put('change-status')
    async changeOrderStatus (@Req() req: Request, @Body() dto: ChangeOrderStatusDto) {
        const user = req.user;
        return await this.orderService.changeOrderStatus(user, dto)
    }

   
}