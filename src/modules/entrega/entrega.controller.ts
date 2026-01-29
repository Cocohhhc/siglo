import { Controller, Get, Param, Post } from '@nestjs/common';
import { EntregaService } from './entrega.service';

@Controller('entrega')
export class EntregaController {
  constructor(private readonly entregaService: EntregaService) {}
  //find all entrega by user id
  @Get(':userId')
  findAll(@Param('userId') userId: number) {
    return this.entregaService.findAll(userId);
  }

  //find all entrega enviadas por el usuario
  @Get(':userId')
  findAllEnviadas(@Param('userId') userId: number) {
    return this.entregaService.findAllEnviados(userId);
  }

  //find one entrega by id
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
