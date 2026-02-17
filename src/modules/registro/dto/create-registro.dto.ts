import { IsNumber } from 'class-validator';

export class CreateRegistroDto {
  @IsNumber()
  departamento_id: number;
  @IsNumber()
  paciente_id: number;
}
