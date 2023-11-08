import { Controller, Get, Param, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { jwtGuardId } from "src/auth/utils/utils";
import { PdfGeneratorService } from "./pdf_generator.service";
import { Response } from "express";
import { GetOrderParam, GetReceiptParam } from "src/order/utils/interfaces";

@UseGuards(AuthGuard(jwtGuardId))
@Controller('pdf')

export class PdfGeneratorController {

    constructor(private pdfGenService: PdfGeneratorService) { }

    @Get('order/:orderId')
    async createOrderPdf(@Param() params: GetOrderParam, @Res() res: Response): Promise<void> {
        const orderId = params.orderId;
        const pdfBuffer = await this.pdfGenService.createOrderPdf(orderId);

        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    }

    @Get('receipt/:receiptId')
    async createReceiptPdf(@Param() params: GetReceiptParam, @Res() res: Response): Promise<void>{
        const receiptId = params.receiptId;
        const pdfBuffer = await this.pdfGenService.createReceiptPdf(receiptId);

        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    }

}