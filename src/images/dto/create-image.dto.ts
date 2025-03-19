import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class CreateImageDto {

    @IsNotEmpty()
    @IsString()
    @Matches(/\.(jpg|jpeg|png|gif)$/i, {
        message: 'La imagen debe tener un formato válido (.jpg, .jpeg, .png, o .gif)',
      })
    image?: string;

    @IsNotEmpty()
    @IsNumber()
    barber_id: number;
}
