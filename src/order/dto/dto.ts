import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ReadyToPickupType } from "../../work_done/types/types";



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
    @IsNumber()
    status_id: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    order_id: number



}

