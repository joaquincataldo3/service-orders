import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ClientModel } from "./client.model";

@Injectable({})

export class ClientService {

    constructor(
        @InjectModel(ClientModel) private clientModel: typeof ClientModel) {}

    allClients(){
        return "All clients"
    }

    async getOneClient(clientId: string) {
        const client = await this.clientModel.findByPk(clientId);
        if (!client) throw new NotFoundException('Cliente no encontrado')
        return client
    }

    async getClientId(first_name: string, last_name: string): Promise<number> {
        const clientExistsInDb = await this.clientModel.findOne({
            where: {
                first_name,
                last_name
            }
        })
        let clientId: number;
        if (clientExistsInDb) {
            const client = clientExistsInDb;
            clientId = client.id;
        } else {
            const clientObjectToDb = {
                first_name,
                last_name
            };
            const newClient = await this.clientModel.create(clientObjectToDb);
            clientId = newClient.id;
        }
        return clientId;
    }

}