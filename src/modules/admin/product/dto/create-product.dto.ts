import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsArray, IsOptional, IsDate, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  logo: string;

  @IsOptional()
  @IsString()
  thumbnail: string;

  position: number;

  @IsBoolean()
  @IsOptional()
  outstand: boolean;

  @IsOptional()
  @IsString()
  status: string;
  
  @IsOptional()
  @IsString()
  shortDescription

  @IsString()
  @IsNotEmpty()
  introduction: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  github: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  @IsOptional()
  video

  slug: string;
    
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  createdAt: Date;

  updatedAt: Date;
  deletedAt: Date;
}
