import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
const mongooseSlugUpdater = require('mongoose-slug-updater');

export type CategoryArticleDocument = CategoryArticle & Document;

@Schema({ timestamps: true })
export class CategoryArticle {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: '' })
  parent_id: string;

  @Prop()
  status: string;

  @Prop()
  position: number;

  @Prop({
    slug: 'title',
    unique: true,
  })
  slug: string; 

  @Prop({ default: false })
  deleted: boolean;

  @Prop()
  deletedAt: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CategoryArticleSchema = SchemaFactory.createForClass(CategoryArticle);

CategoryArticleSchema.plugin(mongooseSlugUpdater);