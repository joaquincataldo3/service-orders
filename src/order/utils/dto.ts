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
    first_name: string

    @IsNotEmpty()
    @IsString()
    last_name: string

}


export class ChangeOrderStatusDto {
    @IsNotEmpty()
    @IsString()
    status_id: string

    @IsNotEmpty()
    @IsString()
    order_id: string

}

