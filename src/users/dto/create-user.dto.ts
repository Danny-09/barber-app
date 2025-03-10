import { Transform } from 'class-transformer';
import { IsEmail, Matches, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  role_id: number;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  address?: string;
}
