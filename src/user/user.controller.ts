import { Controller, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiHeader, ApiParam, ApiTags } from "@nestjs/swagger";

//swagger
@ApiTags('Users')

// protected by guard
@UseGuards(AuthGuard('jwt'))

@ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>'
})


// prefix /users
@Controller('users')

export class UserController {

    constructor (private userService: UserService) {}
    
    @ApiParam({
        name: 'userId'
    })
    

    @Get('all')
    allUsers(){
        return this.userService.allUsers();
    }

    @Get(':userId')
    oneUser(@Param() userId: string){
        return this.userService.getOneUserById(userId);
    }
   

}