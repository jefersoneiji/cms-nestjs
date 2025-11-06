import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class SignUpDto {
    @ApiProperty({ description: 'User name', example: 'John' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'User e-mail', example: 'john@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'User password', example: '123456' })
    @IsStrongPassword()
    password: string;
}