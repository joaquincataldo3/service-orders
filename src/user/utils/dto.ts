
// tenemos que hacerlo con clase
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UserModel } from "../user.model";

// asi podemos validar los datos
export class UserSignUpDto {

   // validamos de esta maenra
   @IsNotEmpty()
   @IsEmail()
   email: string

   @IsNotEmpty()
   @IsString()
   password: string

   @IsNotEmpty()
   @IsString()
   username: string

}

export class UserLoginDto {

   // validamos de esta maenras
   @IsNotEmpty()
   @IsEmail()
   email: string

   @IsNotEmpty()
   @IsString()
   password: string

}

export interface UserToFrontDto {
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
