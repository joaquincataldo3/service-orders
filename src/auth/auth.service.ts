import {ConflictException, ForbiddenException, Injectable, NotFoundException, Res} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/sequelize'
import { UserModel } from 'src/user/user.model'
import { UserLoginDto, UserToFrontDto, UserSignUpDto } from 'src/user/dto/dto'
import { compare, hash } from 'bcryptjs'
import {Response, Request} from 'express';

@Injectable({})

export class AuthService {
    
    constructor(@InjectModel(UserModel) private userModel: typeof UserModel,
    private configService: ConfigService, 
    private jwt: JwtService) {}

    private cookieName: string = "cookie_access_token";

    async getCookie(req: Request) {
        const cookie = req.cookies[this.cookieName];
        if (!cookie) throw new NotFoundException('No hay cookie encontrada');
        return cookie;
    }

    async signToken (id: number, email: string, username: string, method: string): Promise<string> { 
        
        const payload = {
            email,
            username,
            id
        }
        const secret: string = this.configService.get<string>('SECRET')
        // devuelve un token
        return this.jwt.signAsync(payload, {
            expiresIn: `${method === 'login' ? '1h' : '1s'}`,
            secret
        })
    }

    async login(dto: UserLoginDto, res: Response): Promise<UserToFrontDto> {
        
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
        const method = 'login';
        const id = user.id;
        const token = await this.signToken(id, email, password, method);
        const userToFront: UserToFrontDto = {
            id: user.id,
            email: user.email,
            username: user.username,
            access_token: token
        };
        res.cookie(this.cookieName, {...userToFront}, {maxAge: 3600000})
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
            const method = 'login';
            const id = userToDb.id;
            const token: string = await this.signToken(id,userToDb.email, userToDb.username, method)
            const userToFront: UserToFrontDto = {
                id: userToDb.id,
                email: userToDb.email,
                username: userToDb.username,
                access_token: token
            };
            return userToFront;  

    }
}