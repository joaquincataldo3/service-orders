import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ClientService } from "./client.service";
import { AuthGuard } from "@nestjs/passport";
import { jwtGuardId } from "src/auth/utils/utils";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { GetClientParams } from "./interfaces/interfaces";

@ApiTags('Clients')

// all routes protected by guards
@UseGuards(AuthGuard(jwtGuardId))

// /clients prefix
@Controller('clients')

export class ClientController {

    constructor (private clientService: ClientService) {}

  
    @Get('all')
    allClients() {
        return this.clientService.allClients()
    }

    @ApiParam({
        name: 'clientId'
    })
    @Get('one/:clientId')
    oneClient(@Param() params: GetClientParams) {
        const clientIdParams = Number(params.clientId);
        return this.clientService.getOneClient(clientIdParams)
    }

    

}