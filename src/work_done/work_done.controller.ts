import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUserDecorator } from "src/user/custom-decorators/getUser";
import { UserModel } from "src/user/user.model";
import { jwtGuardId } from "src/auth/utils/utils";
import { WorkDoneService } from "./work_done.service";
import { CreateWorkDoneDto } from "./dto/dto";
import { ApiTags } from "@nestjs/swagger";


//swagger
@ApiTags('Work Done')

// protected by guard
@UseGuards(AuthGuard(jwtGuardId))

// prefix /work-done
@Controller('work-done')

export class WorkDoneController {

    constructor(private workDoneService: WorkDoneService) {}

    @Post('create/:orderId')
    @HttpCode(201)
    createWorkDone(@Param() orderId: string, @GetUserDecorator() user: UserModel, @Body() dto: CreateWorkDoneDto){
        return this.workDoneService.createWorkDone(orderId, user, dto);
    }

}