import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class EditDto {
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsString()
    role?: string;
}