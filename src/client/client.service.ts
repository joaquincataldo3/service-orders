import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ClientModel } from "./client.model";

@Injectable({})

export class ClientService {

    constructor(
        @InjectModel(ClientModel) private clientModel: typeof ClientModel) { }

    async allClients(): Promise<ClientModel[]> {
        const clients = await this.clientModel.findAll();
        return clients;
    }

    async createClient(firstName: string, lastName: string): Promise<number> {
        try {
            const clientObjectToDb = {
                first_name: firstName,
                last_name: lastName
            };
            const newClient = await this.clientModel.create(clientObjectToDb);
            const clientId = newClient.id;
            return clientId;
        } catch (error) {
            throw new InternalServerErrorException(`Error in createClient: ${error}`);
        }

    }

    async getOneClient(clientId: number) {
        const client = await this.clientModel.findByPk(clientId);
        if (!client) throw new NotFoundException(`Client not found with id: ${clientId}`)
        return client
    }

    async getClientId(first_name: string, last_name: string): Promise<number> {
        try {
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
                clientId = await this.createClient(first_name, last_name)
            }
            return clientId;
        } catch (error) {
            throw new InternalServerErrorException(`Error in getClientId: ${error}`);
        }

    }

}