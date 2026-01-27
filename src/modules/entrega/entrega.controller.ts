import { Controller, Get, Param, Post } from '@nestjs/common';
import { EntregaService } from './entrega.service';

@Controller('entrega')
export class EntregaController {
  constructor(private readonly entregaService: EntregaService) {}
  //find all entrega
  @Get()
  findAll() {
    return this.entregaService.findAll();
  }
  //find one entrega
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entregaService.findOne(+id);
  }

  //rechazar entrega
  @Post(':id/rechazar')
  rechazar(@Param('id') id: string) {
    return this.entregaService.rechazar(+id);
  }

  //aceptar entrega
  @Post(':id/aceptar')
  aceptar(@Param('id') id: string) {
    return this.entregaService.aceptar(+id);
  }
}
