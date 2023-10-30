import { Controller, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('users')

export class UserController {

    constructor (private userService: UserService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get(':userId')
    // usamos el decorator param y el parseint pipe, para que valide que sea un numero y lo parsee
    oneUser(@Param('userId', ParseIntPipe) userId: string){
        return this.userService.oneUser(userId);
    }

   

}