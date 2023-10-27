import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CommentModel } from "./comment.model";

@Injectable({})

export class CommentService {

    constructor(@InjectModel(CommentModel) private commentModel: typeof CommentModel) {}

    allComments(){
        return "All coments"
    }

    oneComment(){
        return "One comment"
    }
}