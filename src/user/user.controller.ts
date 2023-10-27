import { Body, Controller, Get, HttpCode, Post, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserLoginDto, UserSignUpDto } from "./dto/dto";

@Controller('users')

export class UserController {

    constructor (private userService: UserService) {}

    @Get('all')
    allUsers(){
        return this.userService.allUsers();
    }

    @Get('one')
    oneUser(){
        return this.userService.oneUser();
    }

    @Post('sign-in')
    login(@Body() dto: UserLoginDto) {
        return this.userService.login(dto);
    }

    @Post('sign-up') 
    @HttpCode(201)
    // nestjs tiene un decorator llamado Bdoy
    // la ventaja de esto es que si cambiamos la libreria, esto siempre va apertenecer a nestjs
    // lo hacemos en un dto que es una convención: data transfer object
    signUp (@Body() dto: UserSignUpDto) {

        return this.userService.signUp(dto);
    }

}