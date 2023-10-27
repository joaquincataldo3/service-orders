import { IsNotEmpty, IsString } from "class-validator";



export class CreateOrderDto {

    @IsNotEmpty()
    @IsString()
    entry: string

    @IsNotEmpty()
    @IsString()
    device: string

    @IsNotEmpty()
    @IsString()
    code: string

    @IsNotEmpty()
    @IsString()
    user_id: string

}