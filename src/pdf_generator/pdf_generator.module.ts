import { Module } from "@nestjs/common";
import { PdfGeneratorController } from "./pdf_generator.controller";
import { PdfGeneratorService } from "./pdf_generator.service";
import { OrderModule } from "src/order/order.module";
import { ClientModule } from "src/client/client.module";
import { ReceiptModule } from "src/receipt/receipt.module";

@Module({
    controllers: [PdfGeneratorController],
    providers: [PdfGeneratorService],
    imports: [OrderModule, ClientModule, ReceiptModule],
    exports: []
})

export class PdfGeneratorModule {}