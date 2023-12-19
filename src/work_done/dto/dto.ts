import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ReadyToPickupType } from "src/work_done/types/types";


export class CreateWorkDoneDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    orderId: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    isReadyToPickUp: ReadyToPickupType
}

export class UpdateWorkDoneDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    workDoneId: number
}