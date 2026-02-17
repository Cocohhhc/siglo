import { IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
import { estado } from '@prisma/client';

export class CreateEntregaDto {
  @IsNumber()
  @IsNotEmpty()
  emisor_id: number;

  @IsNumber()
  @IsNotEmpty()
  receptor_id: number;

  @IsNumber()
  @IsNotEmpty()
  paciente_id: number;

  @IsNumber()
  @IsNotEmpty()
  registro_id: number;

  @IsEnum(estado)
  estado: estado;
}
