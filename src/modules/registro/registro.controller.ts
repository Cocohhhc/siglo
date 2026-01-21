import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { registro } from '@prisma/client';
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
  findOne(@Param('id') id: string) {
    const registro = this.registroService.findOne(+id);
    return registro;
  }
}
