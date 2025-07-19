import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  thumnail: string;

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
