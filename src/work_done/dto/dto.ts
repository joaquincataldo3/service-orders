import { IsNotEmpty, IsString } from "class-validator";


export class CreateWorkDoneDto {
    @IsNotEmpty()
    @IsString()
    description: string

}