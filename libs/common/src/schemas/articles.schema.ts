import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

@Schema({ versionKey: false })
export class ArticleDocument extends AbstractDocument {
    @IsNotEmpty()
    @Prop()
    title: string;

    @IsNotEmpty()
    @Prop()
    content: string;

    @IsNotEmpty()
    @Prop()
    author_id: mongoose.Types.ObjectId;
}

export const ArticleSchema = SchemaFactory.createForClass(ArticleDocument);