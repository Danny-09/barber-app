import { StatusEnum } from "@/enums/status.enum";
import { IsBoolean, IsDate, IsDateString, IsEmpty, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateAppointmentDto {
    
    @IsNotEmpty()
    @IsDateString()
    date: string;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

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
}
