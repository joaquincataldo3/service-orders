import { Controller, Get } from "@nestjs/common";
import { CommentService } from "./comment.service";

@Controller('comments')

export class CommentController {

    constructor(private commentService: CommentService){}

    @Get('all')
    allComments(){
        return this.commentService.allComments()
    }

    @Get('one')
    oneComment(){
        return this.commentService.oneComment()
    }

}