import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateArticleDto {
    @ApiProperty({ description: 'Article title.', example: 'Best Birthday Party Ideas.' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'Article content.', example: 'Lorem ipsum dolor sit amet consectur.' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: 'Author id.', example: '45654adab' })
    @IsString()
    @IsNotEmpty()
    author_id: mongoose.Types.ObjectId;
}