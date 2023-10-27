import { Injectable } from "@nestjs/common";

@Injectable({})

export class ClientService {

    allClients(){
        return "All clients"
    }

    oneClient() {
        return "One client !"
    }

}