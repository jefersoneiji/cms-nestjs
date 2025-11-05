import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class PermissionsDocument extends AbstractDocument {
    @Prop()
    name: string;

    @Prop()
    description: string;
}

export const PermissionSchema = SchemaFactory.createForClass(PermissionsDocument);