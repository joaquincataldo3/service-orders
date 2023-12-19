import { Controller, Delete, Param, UseGuards, Put, Body, Post, Get, ParseIntPipe, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { AuthGuard } from "@nestjs/passport";
import { jwtGuardId } from "src/auth/utils/utils";
import { UpdateCommentDto, CreateCommentDto } from "./dto/dto";
import { GetUserDecorator } from "src/user/custom-decorators/getUser";
import { UserModel } from "src/user/user.model";
import { ApiHeader, ApiParam, ApiTags } from "@nestjs/swagger";
import { CommentModel } from "./comment.model";
import { RequestSuccess } from "src/utils/global.interfaces";
import { authorizationTokenSwagger, commentIdParam, userIdParam } from "src/utils/global.constants";

// swagger
@ApiTags('Comment')

// all routes protected by tguard
@UseGuards(AuthGuard(jwtGuardId))

//
@ApiHeader(authorizationTokenSwagger)


// /comments prefix
@Controller('comments')

export class CommentController {

    constructor(private commentService: CommentService){}

    @ApiParam({
        name: userIdParam
    })
    @Get(`all/:${userIdParam}`)
    async getAllComments(@Param(userIdParam, ParseIntPipe) userId: number): Promise<CommentModel[]>{
        try {
            const comments = await this.commentService.getAllCommentsByUser(userId);
            return comments;
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
    

    @Post('create')
    async createComment(@Body() dto: CreateCommentDto, @GetUserDecorator() user: UserModel): Promise<CommentModel> {
        try {
            const userId = user.id;
            return await this.commentService.createComment(dto, userId);
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
        
    }
    
    
    @ApiParam({
        name: commentIdParam
    })
    @Put(`update/:${commentIdParam}`)
    async updateComment(@Param(commentIdParam, ParseIntPipe) commentId: number, @Body() dto: UpdateCommentDto) {
        try {
            await this.commentService.updateComment(commentId, dto);
        } catch (error) {
            throw new InternalServerErrorException()
        }
        
    }
    
    
    @ApiParam({
        name: 'commentId'
    })
    @Delete('delete/:commentId')
    async deleteComment (@Param('commentId', ParseIntPipe) commentId: number): Promise<RequestSuccess>{
        try {
          const isDeleted = await this.commentService.deleteComment(commentId);
          return isDeleted
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException()
        }
       
    }

}