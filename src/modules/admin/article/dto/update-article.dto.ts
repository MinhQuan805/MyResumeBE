import { IsString, IsNotEmpty, IsArray, IsNumber, IsBoolean, IsMongoId, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;


  category_id: string;

  @IsString()
  @IsOptional()
  thumbnail: string;

  @IsNumber()
  @IsOptional()
  position: number;

  @IsString()
  @IsOptional()
  status: string;
  
  @IsString()
  @IsOptional()
  introduction: string;

  @IsString()
  @IsOptional()
  content: string;


  // @IsArray()
  // @IsNotEmpty()
  // tags: string[];
  @IsBoolean()
  @IsOptional()
  outstand: boolean;

  @IsBoolean()
  @IsOptional()
  deleted: boolean;

  @IsString()
  @IsOptional()
  slug: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @IsDate()
  @IsOptional()
  deletedAt: Date;
}
