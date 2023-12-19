import { Controller, Get, InternalServerErrorException, Param, ParseIntPipe, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { jwtGuardId } from "src/auth/utils/utils";
import { PdfGeneratorService } from "./pdf_generator.service";
import { Response } from "express";
import { ApiHeader, ApiParam, ApiTags } from "@nestjs/swagger";
import { authorizationTokenSwagger, orderIdParam, receiptIdParam } from "src/utils/global.constants";

// swagger
@ApiTags('Pdf')

// all routes protected by guard
@UseGuards(AuthGuard(jwtGuardId))

@ApiHeader(authorizationTokenSwagger)

// /pdf prex
@Controller('pdf')

export class PdfGeneratorController {

    constructor(private pdfGenService: PdfGeneratorService) { }


    @ApiParam({
        name: orderIdParam
    })
    @Get(`order/:${orderIdParam}`)
    async createOrderPdf(@Param(orderIdParam, ParseIntPipe) orderId: number, @Res() res: Response): Promise<void> {
        try {
            const pdfBuffer = await this.pdfGenService.createOrderPdf(orderId);
            res.setHeader('Content-Type', 'application/pdf');
            res.send(pdfBuffer);
        } catch (error) {
            throw new InternalServerErrorException()
        }

    }


    @ApiParam({
        name: receiptIdParam
    })
    @Get(`receipt/:${receiptIdParam}`)
    async createReceiptPdf(@Param(receiptIdParam, ParseIntPipe) receiptId: number, @Res() res: Response): Promise<void> {
        try {
            const pdfBuffer = await this.pdfGenService.createReceiptPdf(receiptId);
            res.setHeader('Content-Type', 'application/pdf');
            res.send(pdfBuffer);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException()
        }
       
    }

}