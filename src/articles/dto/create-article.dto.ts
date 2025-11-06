import { IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateArticleDto {
    @IsString()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    author_id: mongoose.Types.ObjectId;
}