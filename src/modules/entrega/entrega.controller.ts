import { Controller, Get, Param, Post } from '@nestjs/common';
import { EntregaService } from './entrega.service';
import { entrega } from '@prisma/client';

@Controller('entrega')
export class EntregaController {
  constructor(private readonly entregaService: EntregaService) {}
  //find all entrega by user id
  @Get('/recibidas/:userId')
  findAll(@Param('userId') userId: string): Promise<entrega[]> {
    return this.entregaService.findAll(+userId);
  }

  //find all entrega enviadas por el usuario
  @Get('/enviadas/:userId')
  findAllEnviadas(@Param('userId') userId: string): Promise<entrega[]> {
    return this.entregaService.findAllEnviados(+userId);
  }

  //find all entrega aceptadas por el usuario
  @Get('/aceptadas/:userId')
  findAceptados(@Param('userId') userId: string): Promise<entrega[]> {
    return this.entregaService.findAceptados(+userId);
  }
                                                                                                                               
  //find all entrega rechazadas por el usuario
  @Get('/rechazadas/:userId')
  findRechazados(@Param('userId') userId: string): Promise<entrega[]> {
    return this.entregaService.findRechazados(+userId);
  }

  //find one entrega by id
  @Get('findOne/:id')
  findOne(@Param('id') id: string): Promise<entrega> {
    return this.entregaService.findOne(+id);
  }

  //rechazar entrega
  @Post('/rechazar/:id')
  rechazar(@Param('id') id: string): Promise<entrega> {
    return this.entregaService.rechazar(+id);
  }

  //aceptar entrega
  @Post('/aceptar/:id')
  aceptar(@Param('id') id: string): Promise<entrega> {
    return this.entregaService.aceptar(+id);
  }
}
