import { Body, Controller, Get, HttpCode, InternalServerErrorException, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUserDecorator } from "src/user/custom-decorators/getUser";
import { UserModel } from "src/user/user.model";
import { jwtGuardId } from "src/auth/utils/utils";
import { WorkDoneService } from "./work_done.service";
import { CreateWorkDoneDto } from "./dto/dto";
import { ApiHeader, ApiTags } from "@nestjs/swagger";


//swagger
@ApiTags('Work Done')

@ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>'
})


// protected by guard
@UseGuards(AuthGuard(jwtGuardId))

// prefix /work-done
@Controller('work-done')

export class WorkDoneController {

    constructor(private workDoneService: WorkDoneService) { }

    @Post('create')
    @HttpCode(201)
    createWorkDone(@GetUserDecorator() user: UserModel, @Body() dto: CreateWorkDoneDto) {
        try {
            const userId = user.id;
            return this.workDoneService.createWorkDone(userId, dto);
        } catch (error) {
            throw new InternalServerErrorException();
        }

    }

}