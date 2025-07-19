import { IsString, IsNotEmpty, IsArray, IsNumber, IsBoolean, IsMongoId } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  category_id: string;
  thumnail: string;

  @IsNumber()
  position: number;

  status: string;
  
  @IsString()
  introduction: string;

  @IsArray()
  @IsNotEmpty()
  content: {
    index: number;
    title: string;
    content: string;
  }[];


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
