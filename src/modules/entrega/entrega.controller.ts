import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { EntregaService } from './entrega.service';
import { entrega } from '@prisma/client';

@Controller('entrega')
export class EntregaController {
  constructor(private readonly entregaService: EntregaService) {}
  //find all entrega by user id
  @Get('/pendientes/:userId')
  findAll(@Param('userId') userId: string): Promise<entrega[]> {
    return this.entregaService.findAllPendientes(+userId);
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
  //find entrega by departamento id
  @Get('/departamento/:departamentoId')
  findBydepartamentoId(@Param('departamentoId') departamentoId: string): Promise<entrega[]> {
    return this.entregaService.findBydepartamentoId(+departamentoId);
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


  //find entrega by idNumber
  @Post('/find')
  async findByIdNumber(@Body() idNumber: string) {
    const entrega = await this.entregaService.findByIdNumber(idNumber);
    return entrega;
  }
}
