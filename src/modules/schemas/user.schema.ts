import { RandomString } from '../../utils/generator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
const mongooseSlugUpdater = require('mongoose-slug-updater');

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop()
    title: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ default: "active" })
    status: string;

    @Prop({default: "client"})
    role: string;

    @Prop({ default: false })
    deleted: boolean;

    @Prop()
    accessToken: string;

    @Prop()
    refreshToken: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ default: Date.now })
    deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongooseSlugUpdater);
