import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    status: string;

    @IsString()
    @IsOptional()
    role: string;

    deleted: boolean;

    createdAt: Date;

    updatedAt: Date;

    deletedAt: Date;
}
