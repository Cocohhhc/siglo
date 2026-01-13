import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateEntregaDto {
  @IsNumber()
  @IsNotEmpty()
  emisor_id: number;

  @IsNumber()
  @IsNotEmpty()
  receptor_id: number;

  @IsString()
  @IsNotEmpty()
  paciente_id: number;

  @IsString()
  @IsNotEmpty()
  registro_id: number;

  @IsString()
  @IsNotEmpty()
  estado: string;
}
