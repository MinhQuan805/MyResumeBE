import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { Document } from 'mongoose';
const mongooseSlugUpdater = require('mongoose-slug-updater');

export type CreateCategoryDtoDocument = CreateCategoryDto & Document;

@Schema({ timestamps: true })
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  parent_id: string;


  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  position: number;

  deleted: boolean;

  deletedAt: Date;

  createdAt: Date;

  updatedAt: Date;
}

export const CreateCategoryDtoSchema = SchemaFactory.createForClass(CreateCategoryDto);

CreateCategoryDtoSchema.plugin(mongooseSlugUpdater);