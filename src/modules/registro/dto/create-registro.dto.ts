import { IsString } from 'class-validator';

export class CreateRegistroDto {
  @IsString()
  departamento_id: number;
  @IsString()
  paciente_id: number;
}
