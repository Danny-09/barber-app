import { StatusEnum } from "@/enums/status.enum";
import { IsBoolean, IsDate, IsDateString, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateAppointmentDto {
    
    @IsNotEmpty()
    @IsDateString()
    date: string;

    @IsOptional()
    @IsNumber()
    user_id?: number;

    @IsNotEmpty()
    @IsNumber()
    barber_id: number;

    @IsNotEmpty()
    @IsNumber()
    service_id: number;

    @IsNotEmpty()
    @IsNumber()
    status: number;

    @IsOptional()
    @IsNumber({})
    total?: number;

    @IsNotEmpty()
    @IsEmail({})
    email: string;
}
