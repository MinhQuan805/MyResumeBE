import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsArray, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  logo: string;

  // @IsOptional()
  // @IsString()
  // shortDescription

  @IsString()
  thumbnail: string;

  @IsNumber()
  @IsOptional()
  position: number;

  @IsString()
  @IsOptional()
  status: string;
  
  @IsString()
  @IsNotEmpty()
  introduction: string;

  @IsArray()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  github: string;

  @IsString()
  @IsOptional()
  website: string;

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
