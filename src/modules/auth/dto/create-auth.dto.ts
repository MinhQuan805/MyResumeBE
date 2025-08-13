import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {
    @IsOptional()
    title;

    @IsNotEmpty({message: "Không được để trống" })
    @IsString()
    email;

    @IsNotEmpty({message: "Không được để trống" })
    @IsString()
    password;
}