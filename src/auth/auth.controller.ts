import {Controller, Get, UseGuards, InternalServerErrorException, ForbiddenException, ConflictException} from '@nestjs/common';
import {Post, Body, HttpCode} from '@nestjs/common';
import { UserSignUpDto, UserLoginDto, UserToFront } from 'src/user/dto/dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import {Req, Res} from '@nestjs/common'
import {Request, Response} from 'express';
import { jwtGuardId } from './utils/utils';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { authorizationTokenSwagger } from 'src/utils/global.constants';

// swagger 
@ApiTags('Auth')


// /auth prefix
@Controller('auth')

export class AuthController {

    constructor (private authService: AuthService) {}

    @Get('get-cookie')
    getCookie (@Req() req: Request){
        try {
            return this.authService.getCookie(req)
        } catch (error) {
            throw new InternalServerErrorException()
        }
        
    }

    @Post('sign-in')
    async login(@Body() dto: UserLoginDto, @Res({passthrough: true}) res: Response): Promise<UserToFront> {
        try {
            return await this.authService.login(dto, res);
        } catch (error) {
            if(error instanceof ForbiddenException) {
                throw error;
            }
            throw new InternalServerErrorException(`${error}`);
        }   
    }

    @UseGuards(AuthGuard(jwtGuardId)) 
    @ApiHeader(authorizationTokenSwagger)
    @Post('sign-up') 
    @HttpCode(201)
    async signUp (@Body() dto: UserSignUpDto): Promise<UserToFront> {
        try {
            return await this.authService.signUp(dto);
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException()
        }
        
    }

   

}