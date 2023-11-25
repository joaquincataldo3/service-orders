import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReceiptDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    first_name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    last_name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    payment_method_id: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    guarantee_id: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    total: number


}