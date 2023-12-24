import { Body, Controller, Get, Post, Req, UseGuards, Put, HttpCode, Param, Query, ParseIntPipe, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { OrderService } from "./order.service";
import { ChangeOrderStatusDto, CreateOrderDto } from "./dto/dto";
import { AuthGuard } from "@nestjs/passport";
import { Request } from 'express';
import { jwtGuardId } from "src/auth/utils/utils";
import { GetUserDecorator } from "src/user/custom-decorators/getUser";
import { UserModel } from "src/user/user.model";
import { OrderModel } from "./order.model";
import { ApiHeader, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { RequestSuccess } from "src/utils/global.interfaces";
import { authorizationTokenSwagger, clientIdParam, orderIdParam, pageQuery, userIdParam } from "src/utils/global.constants";


// swagger tag Orders
@ApiTags('Orders')

// all routes protected by authguard
@UseGuards(AuthGuard(jwtGuardId))

@ApiHeader(authorizationTokenSwagger)


// /orders prefix
@Controller('orders')

export class OrderController {

    constructor(private orderService: OrderService) { }

    
    @Get('all')
    async allOrders(@Query(pageQuery, ParseIntPipe) page: number): Promise<OrderModel[]>{
        try {
            return await this.orderService.allOrders(page);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    @Get(`all/:${userIdParam}`)
    async allOrdersByUser(@Param(userIdParam, ParseIntPipe) userId: string, @Query(pageQuery, ParseIntPipe) page: number): Promise<OrderModel[]> {
        try {
            return await this.orderService.allOrdersByUser(page, userId);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }


    @ApiParam({
        name: orderIdParam
    })
    @Get(`one/:${orderIdParam}`)
    async getOrder(@Param(orderIdParam, ParseIntPipe) orderId: number): Promise<OrderModel> {
        try {
            return await this.orderService.getOrder(orderId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException()
        }
    }

    
   

    @Post('create')
    @HttpCode(201)
    async createOrder(@Body() dto: CreateOrderDto, @GetUserDecorator() user: UserModel): Promise<OrderModel> {
        try {
            return await this.orderService.createOrder(dto, user);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException()
        }

    }

    @Put('change-status')
    async changeOrderStatus(@Body() dto: ChangeOrderStatusDto, @GetUserDecorator() user: UserModel): Promise<RequestSuccess> {
        try {
            const userId = user.id
            return await this.orderService.changeOrderStatus(dto, userId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException();
        }
    }


}