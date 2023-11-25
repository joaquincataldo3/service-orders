import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCommentDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string
}


export class CreateCommentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    order_id: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string
}
