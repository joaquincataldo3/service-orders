import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReceiptDto {

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    first_name: string

    @IsNotEmpty()
    @IsString()
    last_name: string

    @IsNotEmpty()
    @IsNumber()
    payment_method_id: number

    @IsNotEmpty()
    @IsNumber()
    guarantee_id: number

    @IsNotEmpty()
    @IsNumber()
    total: number


}