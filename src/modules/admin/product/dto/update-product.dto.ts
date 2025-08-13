import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

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

  position: number;

  status: string;
  
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
