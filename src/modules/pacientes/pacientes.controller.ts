import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { pacientes } from '@prisma/client';
@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}
  //============================================
  //             CREATE PACIENTE
  //============================================

  @Post('/create')
  async create(
    @Body() createPacienteDto: CreatePacienteDto,
  ): Promise<{ message: string; pacientes: pacientes }> {
    console.log('Creating paciente with data:', createPacienteDto);
    const createPaciente: { message: string; pacientes: pacientes } =
      await this.pacientesService.create(createPacienteDto);
    return createPaciente;
  }

  //=============================================
  //               READ PACIENTE
  //=============================================

  @Get('/all')
  async findAll(): Promise<pacientes[]> {
    const Paciente = await this.pacientesService.findAll();
    return Paciente;
  }

  //============================================
  //                READ PROFILE
  //============================================

  @Get('/profile/:id')
  async findOne(@Param('id') id: number) {
    const Paciente = await this.pacientesService.findOne(+id);
    return Paciente;
  }

  //============================================
  //                UPDATE PACIENTE
  //============================================

  @Put('/update')
  async update(
    @Body() updatePacienteDto: UpdatePacienteDto,
  ): Promise<{ message: string; paciente: pacientes }> {
    const Paciente = await this.pacientesService.update(updatePacienteDto);
    return Paciente;
  }
}
