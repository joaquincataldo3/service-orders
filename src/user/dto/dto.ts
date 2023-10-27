
// tenemos que hacerlo con clase

import { IsEmail, IsNotEmpty, IsString } from "class-validator";

// asi podemos validar los datos
export class UserSignUpDto {
    
   // validamos de esta maenra
   @IsNotEmpty()
   @IsEmail()
   email: string

   @IsNotEmpty()
   @IsString( )
   password: string

   @IsNotEmpty()
   @IsString( )
   username: string

}

export class UserLoginDto {
    
   // validamos de esta maenra
   @IsNotEmpty()
   @IsEmail()
   email: string

   @IsNotEmpty()
   @IsString( )
   password: string

}

export class UserToFrontDto {

   id: number
   email: string
   username: string

}