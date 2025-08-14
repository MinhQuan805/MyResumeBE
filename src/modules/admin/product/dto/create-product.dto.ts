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
