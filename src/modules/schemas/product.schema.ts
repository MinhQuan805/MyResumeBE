
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
const mongooseSlugUpdater = require('mongoose-slug-updater');

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop({default: "hidden"})
  status: string;

  @Prop()
  position: number;

  @Prop({default: ""})
  thumnail: string;

  @Prop()
  introduction: string;

  @Prop()
  content: {
    index: number;
    title: string;
    content: string;
  }[];


  @Prop({default: ""})
  github: string;

  @Prop({default: ""})
  website: string;

  @Prop({
    slug: 'name',
    unique: true,
  })
  slug: string;

  @Prop({default: ""})
  video: {
    url: string;
    thumbnail: string;
  }[];


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
