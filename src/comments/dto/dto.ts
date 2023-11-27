import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCommentDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string
}


export class CreateCommentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    order_id:number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string
    
}
