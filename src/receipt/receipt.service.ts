import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ReceiptModel } from "./receipt.model";

@Injectable({})

export class ReceiptService {

    constructor(@InjectModel(ReceiptModel) private receiptModel: typeof ReceiptModel) {}

    async getAllOrders(){
        try {
            const receipts = await this.receiptModel.findAll();
            return receipts;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(`Error en getAllOrders: ${error}`);
        }
    }
}