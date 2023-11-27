import { Controller, Get, Param, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { jwtGuardId } from "src/auth/utils/utils";
import { PdfGeneratorService } from "./pdf_generator.service";
import { Response } from "express";
import { GetOrderParam, GetReceiptParam } from "src/order/utils/interfaces";
import { ApiHeader, ApiParam, ApiTags } from "@nestjs/swagger";

// swagger
@ApiTags('Pdf')

// all routes protected by guard
@UseGuards(AuthGuard(jwtGuardId))

@ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>'
})

// /pdf prex
@Controller('pdf')

export class PdfGeneratorController {

    constructor(private pdfGenService: PdfGeneratorService) { }
    
    
    @ApiParam({
        name: "orderId"
    })
    @Get('order/:orderId')
    async createOrderPdf(@Param() orderId: string, @Res() res: Response): Promise<void> {
        const pdfBuffer = await this.pdfGenService.createOrderPdf(orderId);

        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    }


    @ApiParam({
        name: "receiptId"
    })
    @Get('receipt/:receiptId')
    async createReceiptPdf(@Param() receiptId: string, @Res() res: Response): Promise<void>{
        const pdfBuffer = await this.pdfGenService.createReceiptPdf(receiptId);

        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    }

}