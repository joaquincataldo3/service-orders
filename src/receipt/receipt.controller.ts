import { Controller, Get, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { jwtGuardId } from "src/utils/utils";
import { ReceiptModel } from "./receipt.model";
import { ReceiptService } from "./receipt.service";

@UseGuards(AuthGuard(jwtGuardId))
@Controller('receipt')

export class ReceiptController {
    
    constructor(private receiptService: ReceiptService) {}

    @Get('all')
    async getAllReceipts(): Promise<ReceiptModel[]>{
        return await this.receiptService.getAllOrders();
    }

    @Get(':receiptId')
    async getOneReceipt(){
        
    }

    @Put('update/:receiptId')
    async updateOneReceipt() {
        
    }

}