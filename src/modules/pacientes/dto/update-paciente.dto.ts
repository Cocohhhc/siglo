import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePacienteDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  IdNumber: string;

  @IsString()
  @IsNotEmpty()
  fecha_de_nacimiento?: string;

  @IsNumber()
  @IsNotEmpty()
  Edad?: number;
}
