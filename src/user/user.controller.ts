import { Controller, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiHeader, ApiParam, ApiTags } from "@nestjs/swagger";
import { userIdParam } from "src/utils/global.constants";

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
    
 
    @Get('all')
    allUsers(){
        return this.userService.allUsers();
    }

    @ApiParam({
        name: userIdParam
    })
    @Get(`:${userIdParam}`)
    oneUser(@Param(userIdParam, ParseIntPipe) userId: number){
        try {
            return this.userService.getOneUserById(userId);
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException();
        }
        
    }
   

}