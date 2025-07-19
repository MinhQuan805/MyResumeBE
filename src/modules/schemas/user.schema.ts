import { RandomString } from '../../utils/generator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
const mongooseSlugUpdater = require('mongoose-slug-updater');

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ default: "active" })
    status: string;

    @Prop({ default: false })
    deleted: boolean;

    @Prop()
    code_id: string;

    @Prop()
    code_expired: Date;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ default: Date.now })
    deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongooseSlugUpdater);
