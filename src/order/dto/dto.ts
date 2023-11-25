import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class CreateOrderDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    entry: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    device: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    code: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    first_name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    last_name: string

}


export class ChangeOrderStatusDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status_id: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    order_id: string

}

