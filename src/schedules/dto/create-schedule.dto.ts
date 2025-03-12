import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateScheduleDto {
    @IsNotEmpty()
    @IsNumber()
    barber_id: number;

    @IsNotEmpty()
    @IsString()
    day: string;

    @IsNotEmpty()
    @IsString()
    start_time: string;

    @IsNotEmpty()
    @IsString()
    end_time: string;
}
