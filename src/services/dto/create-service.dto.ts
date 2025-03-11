import { IsBoolean, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateServiceDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;

    @IsNotEmpty()
    @IsNumber()
    barber_id: number;
}
