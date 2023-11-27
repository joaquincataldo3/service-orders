import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ReadyToPickupType } from "src/work_done/types/types";


export class CreateWorkDoneDto {
    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    orderId: number

    @IsNotEmpty()
    @IsNumber()
    isReadyToPickUp: ReadyToPickupType

}