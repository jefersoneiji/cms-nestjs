import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class EditDto {
    @IsString()
    name: string;
    
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsString()
    role?: string;
}