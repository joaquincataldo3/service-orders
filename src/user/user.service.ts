import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "./user.model";
import { GetUserFilterParam, GetUserFilterReturn } from "./dto/dto";

@Injectable({})

export class UserService {

    constructor(@InjectModel(UserModel) private userModel: typeof UserModel) { }

    async allUsers() {
        const allUsers = await this.userModel.findAll();
        return allUsers; 
    }

    async getOneUserByField(filter: GetUserFilterParam): Promise<GetUserFilterReturn> {
        if (filter) {
            const { field, value } = filter;
            let where = {}
            where[field.toLowerCase()] = value.toLowerCase();
            const userWithFilter = await this.userModel.findOne({ where })
            if (!userWithFilter) return { ok: false, user: undefined}
            return {ok: true, user: userWithFilter};
        }
    }

    async getOneUserById(userId: string): Promise<UserModel> {
        const userWithFilter = await this.userModel.findByPk(userId);
        if(!userWithFilter) throw new NotFoundException(`No se pudo encontrar usuario con id: ${userId}`)
        return userWithFilter;
    }

}