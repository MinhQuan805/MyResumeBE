
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
const mongooseSlugUpdater = require('mongoose-slug-updater');

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop()
  title: string;

  @Prop({default: ""})
  thumnail: string;

  @Prop()
  position: number;

  @Prop({default: "hidden"})
  status: string;

  @Prop()
  introduction: string;


  @Prop()
  content: {
    index: number;
    title: string;
    content: string;
  }[];

  @Prop()
  author: string;

  @Prop()
  tags: string[];

  @Prop()
  views: number;

  @Prop({default: false})
  outstand: boolean;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({
    slug: 'title',
    unique: true,
    slugPaddingSize: 4,
    permanent: false,
  })
  slug: string;

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ default: () => new Date() })
  updatedAt: Date;

  @Prop({ default: () => new Date() })
  deletedAt: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

ArticleSchema.plugin(mongooseSlugUpdater);
