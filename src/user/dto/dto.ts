
// tenemos que hacerlo con clase
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UserModel } from "../user.model";
import { ApiProperty } from "@nestjs/swagger";

// asi podemos validar los datos
export class UserSignUpDto {

   @ApiProperty()
   @IsNotEmpty()
   @IsEmail()
   email: string

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   password: string

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   username: string

}

export class UserLoginDto {

   @ApiProperty()
   @IsNotEmpty()
   @IsEmail()
   email: string

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   password: string

}

export interface UserToFront {
   
   id: number
   email: string
   username: string
   access_token: string
}

export interface GetUserFilterParam {
   field: string,
   value: string
}

export interface GetUserFilterReturn {
   ok: boolean,
   user?: UserModel | undefined
}
