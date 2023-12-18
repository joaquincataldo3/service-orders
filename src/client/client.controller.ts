import { Controller, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { ClientService } from "./client.service";
import { AuthGuard } from "@nestjs/passport";
import { jwtGuardId } from "src/auth/utils/utils";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { clientIdParam } from "src/utils/global.constants";

@ApiTags('Clients')

// all routes protected by guards
@UseGuards(AuthGuard(jwtGuardId))

// /clients prefix
@Controller('clients')

export class ClientController {

    constructor(private clientService: ClientService) { }


    @Get('all')
    allClients() {
        try {
            return this.clientService.allClients()
        } catch (error) {
            throw new InternalServerErrorException()
        }

    }

    @ApiParam({
        name: clientIdParam
    })
    @Get(`one/:${clientIdParam}`)
    oneClient(@Param(clientIdParam, ParseIntPipe) clientId: number) {
        try {
            const clientIdParams = Number(clientId);
            return this.clientService.getOneClient(clientIdParams)
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException()
        }

    }



}