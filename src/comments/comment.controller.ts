import { Controller, Delete, Param, UseGuards, Put, Body, Post} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { AuthGuard } from "@nestjs/passport";
import { jwtGuardId } from "src/utils/utils";
import { UpdateCommentDto, createCommentDto } from "./dto/dto";
import { GetUserDecorator } from "src/user/custom-decorators/getUser";
import { UserModel } from "src/user/user.model";

// hace que el guards sea global para todas esas rutas
@UseGuards(AuthGuard(jwtGuardId))
@Controller('comments')

export class CommentController {

    constructor(private commentService: CommentService){}

    @Post('create')
    async createComment(@Body() dto: createCommentDto, @GetUserDecorator() user: UserModel) {
        await this.commentService.createComment(dto, user)
    }

    @Put('update/:commentId')
    async updateComment(@Param() commentId: string, @Body() dto: UpdateCommentDto) {
        await this.commentService.updateComment(commentId, dto)
    }

    @Delete('delete/:commentId')
    async deleteComment (@Param() commentId: string){
       return await this.commentService.deleteComment(commentId)
    }

}