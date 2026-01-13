import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  IdNumber: string;

  @IsString()
  @IsNotEmpty()
  date_of_birth: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;
}
