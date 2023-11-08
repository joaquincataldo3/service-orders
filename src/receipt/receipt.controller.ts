import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { jwtGuardId } from "src/auth/utils/utils";
import { ReceiptModel } from "./receipt.model";
import { ReceiptService } from "./receipt.service";
import { CreateReceiptDto } from "./utils/dto";
import { GetUserDecorator } from "src/user/custom-decorators/getUser";
import { UserModel } from "src/user/user.model";

@UseGuards(AuthGuard(jwtGuardId))
@Controller('receipts')

export class ReceiptController {
    
    constructor(private receiptService: ReceiptService) {}

    @Get('all')
    async getAllReceipts(): Promise<ReceiptModel[]>{
        return await this.receiptService.getAllReceipts();
    }

    @Get(':receiptId')
    async getOneReceipt(@Param() receiptId: string): Promise<ReceiptModel>{
        return await this.receiptService.getOneReceipt(receiptId);
    }

    @Post('/create') 
    async createReceipt(@Body() createReceiptDto: CreateReceiptDto, @GetUserDecorator() activeUser: UserModel): Promise<ReceiptModel>{
        return await this.receiptService.createReceipt(createReceiptDto, activeUser);
    }

    @Put('update/:receiptId')
    async updateOneReceipt(@Param() receiptId: string, @Body() updateReceiptDto: CreateReceiptDto, @GetUserDecorator() activeUser: UserModel) {
        return this.updateOneReceipt(receiptId, updateReceiptDto, activeUser);
    }

}