import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ versionKey: false })
export class RoleDocument extends AbstractDocument {
    @Prop()
    name: string;

    @Prop()
    permissions: [mongoose.Types.ObjectId];
}

export const RoleSchema = SchemaFactory.createForClass(RoleDocument);