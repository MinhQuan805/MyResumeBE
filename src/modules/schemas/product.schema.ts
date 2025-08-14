
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
const mongooseSlugUpdater = require('mongoose-slug-updater');

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop({default: "ongoing"})
  status: string;

  @Prop()
  position: number;

  @Prop({default: ""})
  logo: string;

  @Prop({default: ""})
  thumbnail: string;

  @Prop({default: ""})
  shortDescription: string;

  @Prop({default: false})
  outstand: boolean;

  @Prop()
  introduction: string;

  @Prop()
  content: string

  @Prop({default: ""})
  github: string;

  @Prop({default: ""})
  website: string;

  @Prop({
    slug: 'title',
    unique: true,
  })
  slug: string;

  @Prop({default: ""})
  video: string;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ default: () => new Date() })
  updatedAt: Date;

  @Prop({ default: () => new Date() })
  deletedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.plugin(mongooseSlugUpdater);
