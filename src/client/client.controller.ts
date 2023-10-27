import { Controller, Get } from "@nestjs/common";
import { ClientService } from "./client.service";

@Controller('clients')

export class ClientController {

    constructor (private clientService: ClientService) {}

    @Get('all')
    allClients() {
        return this.clientService.allClients()
    }

    @Get('one')
    oneClient() {
        return this.clientService.oneClient()
    }
}