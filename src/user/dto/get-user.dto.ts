import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetUserDto {
    @ApiProperty({ description: 'User id', example: '154sb54ad' })
    @IsString()
    @IsNotEmpty()
    _id: string;
}