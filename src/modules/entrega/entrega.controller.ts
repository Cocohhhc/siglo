import { Controller } from '@nestjs/common';
import { EntregaService } from './entrega.service';

@Controller('entrega')
export class EntregaController {
  constructor(private readonly entregaService: EntregaService) {}
}
