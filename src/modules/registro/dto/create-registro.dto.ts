import { IsNumber } from 'class-validator';

export class CreateRegistroDto {
  @IsNumber()
  paciente_id: number;
  @IsNumber()
  emisor_id: number;
  @IsNumber()
  receptor_id: number;
}
