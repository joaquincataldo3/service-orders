import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ClientModel } from "./client.model";

@Injectable({})

export class ClientService {

    constructor(@InjectModel(ClientModel) private clientModel: typeof ClientModel) {}

    allClients(){
        return "All clients"
    }

    oneClient() {
        return "One client !"
    }

    async getClientId(first_name: string, last_name: string): Promise<number> {
        const clientExistsInDb = await this.clientModel.findOne({
            where: {
                first_name,
                last_name
            }
        })
        if (clientExistsInDb) {
            const client = clientExistsInDb;
            const clientId = client.id;
            return clientId;
        } else {
            const clientObjectToDb = {
                first_name,
                last_name
            };
            const newClient = await this.clientModel.create(clientObjectToDb);
            const clientId = newClient.id;
            return clientId;
        }
    }

}