import { ConflictException, ForbiddenException, HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "./user.model";
import { UserLoginDto, UserSignUpDto, UserToFrontDto } from "./dto/dto";
import { hash } from "bcryptjs";

@Injectable({})

export class UserService {

    constructor(@InjectModel(UserModel) private userModel: typeof UserModel) { }

    allUsers() {
        return "All users !"
    }

    oneUser() {
        return "One user !"
    }

    async login(dto: UserLoginDto) {
        const {email, password} = dto
        const emailInDB = await this.userModel.findOne({
            where: {
                email
            }
        })
        if(!emailInDB){
           
        }
        return "Login !"
    }

    async signUp(dto: UserSignUpDto) {

            const { password, email, username } = dto;
            const hashedPw = await hash(password, 10);
            const userData = {
                email,
                username,
                password: hashedPw
            };
            const usernameInDb = await this.userModel.findOne({
                where: {username}
            })
            if(usernameInDb){
                throw new ConflictException('El usuario ya se encuentra en la base de datos')
            }
            const emailInDb = await this.userModel.findOne({
                where: {email}
            })
            if(emailInDb){
                throw new ConflictException('El email ya se encuentra en la base de datos')
            }
            const userToDb: UserModel = await this.userModel.create(userData);
            const userToFront: UserToFrontDto = {
                id: userToDb.id,
                email: userToDb.email,
                username: userToDb.username
            };
            return userToFront;
        

    }

}