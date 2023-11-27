import { Controller, Delete, Param, UseGuards, Put, Body, Post, Get} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { AuthGuard } from "@nestjs/passport";
import { jwtGuardId } from "src/auth/utils/utils";
import { UpdateCommentDto, CreateCommentDto } from "./dto/dto";
import { GetUserDecorator } from "src/user/custom-decorators/getUser";
import { UserModel } from "src/user/user.model";
import { ApiHeader, ApiParam, ApiTags } from "@nestjs/swagger";
import { CommentModel } from "./comment.model";

// swagger
@ApiTags('Comment')

// all routes protected by tguard
@UseGuards(AuthGuard(jwtGuardId))

//
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>'
})


// /comments prefix
@Controller('comments')

export class CommentController {

    constructor(private commentService: CommentService){}

    @Get('all')
    async getAllComments(): Promise<CommentModel[]>{
        return await this.commentService.getAllComments()
    }
    

    @Post('create')
    async createComment(@Body() dto: CreateCommentDto, @GetUserDecorator() user: UserModel) {
        const userId = user.id;
        return await this.commentService.createComment(dto, userId)
    }
    
    
    @ApiParam({
        name: 'commentId'
    })
    @Put('update/:commentId')
    async updateComment(@Param() commentId: string, @Body() dto: UpdateCommentDto) {
        await this.commentService.updateComment(commentId, dto)
    }
    
    
    @ApiParam({
        name: 'commentId'
    })
    @Delete('delete/:commentId')
    async deleteComment (@Param() commentId: string){
       return await this.commentService.deleteComment(commentId)
    }

}