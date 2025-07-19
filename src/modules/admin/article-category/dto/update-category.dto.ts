import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { Document } from 'mongoose';
const mongooseSlugUpdater = require('mongoose-slug-updater');

export type UpdateCategoryDtoDocument = UpdateCategoryDto & Document;

@Schema({ timestamps: true })
export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  parent_id: string;


  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  position: number;

  @IsBoolean()
  @IsNotEmpty()
  deleted: boolean;

  deletedAt: Date;

  createdAt: Date;

  updatedAt: Date;
}

export const UpdateCategoryDtoSchema = SchemaFactory.createForClass(UpdateCategoryDto);

UpdateCategoryDtoSchema.plugin(mongooseSlugUpdater);