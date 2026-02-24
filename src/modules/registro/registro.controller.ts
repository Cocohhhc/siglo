import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { registro, departament, pacientes } from '@prisma/client';

@Controller('registro')
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  //============================================
  //               CREATE REGISTRO
  //============================================
  @Post('/create')
  create(@Body() createRegistroDto: CreateRegistroDto): Promise<registro> {
    return this.registroService.create(createRegistroDto);
  }

  //============================================
  //               READ REGISTRO
  //============================================
  @Get(':id')
  findOne(@Param('id') id: string): Promise<{
    departamento: departament;
    paciente: pacientes;
    registros: registro[];
  }> {
    return this.registroService.findOne(+id);
  }

  //============================================
  //               Find by IdNumber
  //============================================

  @Get('/find')
  async findByIdNumber(@Body() idNumber: string) {
    const registro = await this.registroService.findByIdNumber(idNumber);
    return registro;
  }
}
