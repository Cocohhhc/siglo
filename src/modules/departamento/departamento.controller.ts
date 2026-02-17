import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { departament } from '@prisma/client';
@Controller('departamento')
export class DepartamentoController {
  constructor(private readonly departamentoService: DepartamentoService) {}

  @Post('create')
  async create(@Body() body: CreateDepartamentoDto): Promise<departament> {
    return await this.departamentoService.create(body);
  }

  @Get('find_one/:id')
  async findOne(@Param('id') id: string): Promise<departament> {
    return await this.departamentoService.findOne(+id);
  }

  @Get('find_all')
  async findAll(): Promise<departament[]> {
    return await this.departamentoService.findAll();
  }
}
