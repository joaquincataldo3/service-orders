import { Body, Controller, Get, HttpCode, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUserDecorator } from "src/user/custom-decorators/getUser";
import { UserModel } from "src/user/user.model";
import { jwtGuardId } from "src/auth/utils/utils";
import { WorkDoneService } from "./work_done.service";
import { CreateWorkDoneDto, UpdateWorkDoneDto } from "./dto/dto";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { WorkDoneModel } from "./work_done.model";
import { authorizationTokenSwagger, userIdParam } from "src/utils/global.constants";


//swagger
@ApiTags('Work Done')

@ApiHeader(authorizationTokenSwagger)


// protected by guard
@UseGuards(AuthGuard(jwtGuardId))

// prefix /work-done
@Controller('work-done')

export class WorkDoneController {

    constructor(private workDoneService: WorkDoneService) { }

    @Get(`:${userIdParam}`)
    async getWorksDoneByUser(@Param(userIdParam, ParseIntPipe) userId: number): Promise<WorkDoneModel> {
        try {
            return await this.getWorksDoneByUser(userId);
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException()
        }
    }

    @Post('create')
    @HttpCode(201)
    async createWorkDone(@GetUserDecorator() user: UserModel, @Body() dto: CreateWorkDoneDto) {
        try {
            const userId = user.id;
            return await this.workDoneService.createWorkDone(userId, dto);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    @Post('update')
    @HttpCode(201)
    async updateWorkDone(@Body() dto: UpdateWorkDoneDto) {
        try {
            return this.workDoneService.updateWorkDone(dto);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

}