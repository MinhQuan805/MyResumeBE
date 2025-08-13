import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  logo: string;

  thumbnail: string;

  position: number;

  status: string;
  
  // @IsOptional()
  // @IsString()
  // shortDescription

  @IsString()
  @IsNotEmpty()
  introduction: string;

  @IsArray()
  @IsNotEmpty()
  content: string;

  github: string;

  website: string;

  tags: string[];
}
