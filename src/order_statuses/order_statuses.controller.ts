import { Controller, Get } from "@nestjs/common";
import { OrderStatusesService } from "./order_statuses.service";

@Controller('order-statuses')

export class OrderStatusesController {

    constructor (private orderStatusesService: OrderStatusesService) {}

    @Get('all')
    allStatuses() {
        return this.orderStatusesService.allStatuses(  )
    }
}