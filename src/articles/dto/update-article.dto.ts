import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import mongoose from "mongoose";

export class UpdateArticleDto {
    @ApiProperty({ description: 'Article title.', example: 'Best Holiday Ideas.' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'Article content.', example: 'Lorem ipsum dolor sit amet consectur.' })
    @IsString()
    content: string;

    @ApiProperty({ description: 'Author id.', example: '45654adab' })
    @IsString()
    author_id: mongoose.Types.ObjectId;
}