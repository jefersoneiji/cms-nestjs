import { IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class UpdateArticleDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    author_id: mongoose.Types.ObjectId;
}