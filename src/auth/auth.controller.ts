import {Controller, Get, UseGuards, InternalServerErrorException} from '@nestjs/common';
import {Post, Body, HttpCode} from '@nestjs/common';
import { UserSignUpDto, UserLoginDto } from 'src/user/dto/dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import {Req, Res} from '@nestjs/common'
import {Request, Response} from 'express';
import { jwtGuardId } from './utils/utils';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

// swagger 
@ApiTags('Auth')


// /auth prefix
@Controller('auth')

export class AuthController {

    constructor (private authService: AuthService) {}

    @Get('get-cookie')
    getCookie (@Req() req: Request){
        return this.authService.getCookie(req)
    }

    @Post('sign-in')
    async login(@Body() dto: UserLoginDto, @Res({passthrough: true}) res: Response) {
        try {
            return await this.authService.login(dto, res);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException()
        }
       
    }

    /* @UseGuards(AuthGuard(jwtGuardId)) */
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer <token>'
    })
    @Post('sign-up') 
    @HttpCode(201)
    // nestjs tiene un decorator llamado Bdoy
    // la ventaja de esto es que si cambiamos la libreria, esto siempre va apertenecer a nestjs
    // lo hacemos en un dto que es una convención: data transfer object
    async signUp (@Body() dto: UserSignUpDto) {
        return await this.authService.signUp(dto);
    }

   

}