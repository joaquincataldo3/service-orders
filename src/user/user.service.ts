import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "./user.model";
import { GetUserFilterParam, GetUserFilterReturn } from "./dto/dto";

@Injectable({})

export class UserService {

    constructor(@InjectModel(UserModel) private userModel: typeof UserModel) { }

    async allUsers() {
        try {
            const allUsers = await this.userModel.findAll();
            return allUsers;
        } catch (error) {
            throw new InternalServerErrorException(`Error in allUsers: ${error}`);
        }

    }

    async getOneUserByField(filter: GetUserFilterParam): Promise<GetUserFilterReturn> {
        try {
            const { field, value } = filter;
            let where = {}
            where[field.toLowerCase()] = value.toLowerCase();
            console.log(where[field]);;
            const userWithFilter = await this.userModel.findOne({ where: {
                email: value
            } });
            console.log(userWithFilter)
            if (!userWithFilter) return { ok: false, user: undefined }
            return { ok: true, user: userWithFilter };
        } catch (error) {
            throw new InternalServerErrorException(`Error in getOneUserByField: ${error}`);
        }
    }

    async getOneUserById(userId: number): Promise<UserModel> {
        const userWithFilter = await this.userModel.findByPk(userId);
        if (!userWithFilter) throw new NotFoundException(`No user was found with id: ${userId}`)
        return userWithFilter;
    }

}