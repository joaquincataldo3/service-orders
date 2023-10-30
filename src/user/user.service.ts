import { Injectable } from "@nestjs/common";

@Injectable({})

export class UserService {

    constructor() { }

    allUsers() {
        return "All users !"
    }

    oneUser(userId: string) {
        return userId;
    }

}