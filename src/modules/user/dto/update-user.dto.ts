import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
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

    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
