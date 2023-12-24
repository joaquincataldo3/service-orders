import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { jwtGuardId } from "src/auth/utils/utils";
import { ReceiptModel } from "./receipt.model";
import { ReceiptService } from "./receipt.service";
import { CreateReceiptDto } from "./dto/dto";
import { GetUserDecorator } from "src/user/custom-decorators/getUser";
import { UserModel } from "src/user/user.model";
import { ApiTags, ApiParam, ApiHeader, ApiQuery } from "@nestjs/swagger";
import { GetReceiptParams } from "./interfaces/interfaces";
import { authorizationTokenSwagger, pageQuery, receiptIdParam, userIdParam } from "src/utils/global.constants";

@ApiTags('Receipts')

// routes protected by guard
@UseGuards(AuthGuard(jwtGuardId))

@ApiHeader(authorizationTokenSwagger)

// /receipts prefix
@Controller('receipts')

export class ReceiptController {

    constructor(private receiptService: ReceiptService) { }

    @Get('all')
    async getAllReceipts(@Query(pageQuery, ParseIntPipe) page: number): Promise<ReceiptModel[]> {
        try {
            return await this.receiptService.getAllReceipts(page)
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    @ApiQuery({
        name: pageQuery
    })
    @ApiParam({
        name: userIdParam,
        required: false,
        description: 'If not provided, will return all orders'
    })
    @Get(`all/:${userIdParam}`)
    async getAllReceiptsByUser(@Query(pageQuery, ParseIntPipe) page: number, @Param(userIdParam, ParseIntPipe) userId?: number): Promise<ReceiptModel[]> {
        try {
            return await this.receiptService.getAllReceiptsByUser(page, userId);
        } catch (error) {
            throw new InternalServerErrorException()
        }

    }

    @ApiParam({
        name: receiptIdParam
    })
    @Get(`one/:${receiptIdParam}`)
    async getOneReceipt(@Param() params: GetReceiptParams): Promise<ReceiptModel> {
        try {
            const receiptIdParams = Number(params.receiptId);
            return await this.receiptService.getOneReceipt(receiptIdParams);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException();
        }

    }

    @Post('/create')
    async createReceipt(@Body() createReceiptDto: CreateReceiptDto, @GetUserDecorator() activeUser: UserModel): Promise<ReceiptModel> {
        try {
            return await this.receiptService.createReceipt(createReceiptDto, activeUser);
        } catch (error) {
            throw new InternalServerErrorException()
        }
       
    }

    @ApiParam({
        name: receiptIdParam
    })
    @Put(`update/:${receiptIdParam}`)
    async updateOneReceipt(@Param() receiptId: string, @Body() updateReceiptDto: CreateReceiptDto, @GetUserDecorator() activeUser: UserModel) {
        try {
            return this.updateOneReceipt(receiptId, updateReceiptDto, activeUser);
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException()
        }
       
    }

}