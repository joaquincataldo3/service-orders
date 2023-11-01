import { Controller, Get, UseGuards } from "@nestjs/common";
import { ClientService } from "./client.service";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
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