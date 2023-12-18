import { ConflictException, ForbiddenException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, Res } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/sequelize'
import { UserModel } from 'src/user/user.model'
import { UserLoginDto, UserToFront, UserSignUpDto } from 'src/user/dto/dto'
import { compare, hash } from 'bcryptjs'
import { Response, Request } from 'express';
import { UserService } from 'src/user/user.service'

@Injectable({})

export class AuthService {

    constructor(@InjectModel(UserModel) private userModel: typeof UserModel,
        private configService: ConfigService,
        private jwt: JwtService,
        private userService: UserService) { }

    private cookieName: string = "cookie_access_token";

    async getCookie(req: Request) {
        const cookie = req.cookies[this.cookieName];
        if (!cookie) throw new NotFoundException('No hay cookie encontrada');
        return cookie;
    }


    async signToken(id: number, email: string, username: string): Promise<string> {
        try {
            const payload = {
                email,
                username,
                id
            }
            const secret: string = this.configService.get<string>('SECRET')
            // devuelve un token
            return this.jwt.signAsync(payload, {
                expiresIn: '1h',
                secret
            })
        } catch (error) {
            throw new InternalServerErrorException(`Error in signToken: ${error}`);
        }

    }

    async login(dto: UserLoginDto, res: Response): Promise<UserToFront> {
        const { email, password } = dto
        const isEmailInDb = await this.userService.getOneUserByField({ field: 'email', value: email });
        if (!isEmailInDb.ok) {
            throw new ForbiddenException('Invalid credentials');
        }
        const user = isEmailInDb.user;
        const bodyPassword = password.toLowerCase();
        const userInDbPassword = user.password;
        const pwMatches: boolean = await compare(bodyPassword, userInDbPassword);
        if (!pwMatches) {
            throw new ForbiddenException('Invalid credentials')
        };
        const { id } = user;
        const token = await this.signToken(id, email, password);
        const userToFront: UserToFront = {
            id: user.id,
            email: user.email,
            username: user.username,
            access_token: token
        };
        res.cookie(this.cookieName, { ...userToFront }, { maxAge: 3600000 })
        return userToFront;
    }

    async signUp(dto: UserSignUpDto): Promise<UserToFront> {
        const { password, email, username } = dto;
        const hashedPw = await hash(password, 10);
        const userData = {
            email: email.toLowerCase(),
            username: email.toLowerCase(),
            password: hashedPw
        };
        const usernameInDb = await this.userService.getOneUserByField({ field: 'username', value: username })
        if (usernameInDb.ok) {
            throw new ConflictException('There is already a user registered with that username')
        }
        const emailInDb = await this.userService.getOneUserByField({ field: 'email', value: email })
        if (emailInDb.ok) {
            throw new ConflictException('There is already a user registered with that email')
        }
        const userToDb: UserModel = await this.userModel.create(userData);
        const id = userToDb.id;
        const token: string = await this.signToken(id, userToDb.email, userToDb.username);
        const userToFront: UserToFront = {
            id: userToDb.id,
            email: userToDb.email,
            username: userToDb.username,
            access_token: token
        };
        return userToFront;
    }
}