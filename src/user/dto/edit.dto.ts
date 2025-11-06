import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class EditDto {
    @ApiProperty({ description: 'User name', example: 'John' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'User e-mail', example: 'john@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'User password', example: '123456' })
    @IsStrongPassword()
    password: string;

    @ApiProperty({ description: 'User role', example: 'admin' })
    @IsString()
    role?: string;
}