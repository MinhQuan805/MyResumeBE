import { IsString, IsNotEmpty, IsArray, IsNumber, IsBoolean } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  category_id: string;
  thumbnail: string;
  position: number;

  status: string;
  
  @IsString()
  introduction: string;

  @IsArray()
  @IsNotEmpty()
  content: string;


  @IsString()
  @IsNotEmpty()
  author: string;

  @IsArray()
  @IsNotEmpty()
  tags: string[];

  outstand: boolean;
  deleted: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
