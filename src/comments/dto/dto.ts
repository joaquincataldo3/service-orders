import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCommentDto {
    @IsNotEmpty()
    @IsString()
    description: string
}


export class createCommentDto {
    @IsNotEmpty()
    @IsString()
    order_id: string

    @IsNotEmpty()
    @IsString()
    description: string
}
