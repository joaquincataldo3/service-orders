import { ConflictException, ForbiddenException, HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "./user.model";
import { UserLoginDto, UserSignUpDto, UserToFrontDto } from "./dto/dto";
import { hash, compare } from "bcryptjs";
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config";

@Injectable({})

export class UserService {

    constructor(@InjectModel(UserModel) private userModel: typeof UserModel, private jwt: JwtService, private configService: ConfigService) { }

    allUsers() {
        return "All users !"
    }

    oneUser() {
        return "One user !"
    }

    async signToken (email: string, username: string): Promise<string> { 
        const payload = {
            email,
            username
        }
        const secret: string = this.configService.get<string>('SECRET')
        // devuelve un token
        return this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret
        })
    }

    async login(dto: UserLoginDto): Promise<UserToFrontDto> {
        
        const {email, password} = dto
        const emailInDB = await this.userModel.findOne({
            where: {
                email
            }
        })
        if(!emailInDB){
           throw new ForbiddenException('El email no se encuentra en la base de datos');
        }
        const user: UserModel = emailInDB;
        const pwMatches: boolean = await compare(password, user.password);
        if(!pwMatches) {
            throw new ForbiddenException('Las contraseñas no coinciden')
        };
        const token = await this.signToken(email, password);
        const userToFront: UserToFrontDto = {
            id: user.id,
            email: user.email,
            username: user.username,
            access_token: token
        };
        return userToFront;
    }

    async signUp(dto: UserSignUpDto): Promise<UserToFrontDto> {

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
            // devuelve un 409
            if(usernameInDb){
                throw new ConflictException('El usuario ya se encuentra en la base de datos')
            }
            const emailInDb = await this.userModel.findOne({
                where: {email}
            })
            // devuelve un 409
            if(emailInDb){
                throw new ConflictException('El email ya se encuentra en la base de datos')
            }
            const userToDb: UserModel = await this.userModel.create(userData);
            const token: string = await this.signToken(userToDb.email, userToDb.username)
            const userToFront: UserToFrontDto = {
                id: userToDb.id,
                email: userToDb.email,
                username: userToDb.username,
                access_token: token
            };
            return userToFront;
        

    }

}