import { IsString, IsNotEmpty, IsBoolean, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;


  category_id: string;

  @IsString()
  @IsOptional()
  thumbnail: string;

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

  deleted: boolean;
  slug: string;
  
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  createdAt: Date;

  updatedAt: Date;
  deletedAt: Date;
}
