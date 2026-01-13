import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { PrismaService } from 'src/databases/prisma.service';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { ValidarCedulaService } from 'src/common/validarCedula.service';
import { pacientes } from '@prisma/client';
@Injectable()
export class PacientesService {
  constructor(
    private prisma: PrismaService,
    private validarCedulaService: ValidarCedulaService,
  ) {}
  //============================================
  //               CREATE PACIENTE
  //============================================
  async create(
    createPacienteDto: CreatePacienteDto,
  ): Promise<{ message: string; pacientes: pacientes }> {
    const fecha_de_nacimiento = String(createPacienteDto.date_of_birth);
    const edad = Number(createPacienteDto.age);
    const name = String(createPacienteDto.name);
    const lastName = String(createPacienteDto.lastName);
    //cedula
    const IdNumber = String(createPacienteDto.IdNumber);

    const verifiUser = await this.prisma.pacientes.findUnique({
      where: {
        IdNumber: createPacienteDto.IdNumber,
      },
    });
    if (verifiUser) {
      throw new BadRequestException('Paciente already exists');
    }

    //validar cedula
    const verifyCedula = this.validarCedulaService.validarCedulaRD(
      createPacienteDto.IdNumber,
    );
    if (!verifyCedula) {
      throw new BadRequestException('Cédula no válida');
    }

    const pacientes: pacientes = await this.prisma.pacientes.create({
      data: {
        name: name,
        lastName: lastName,
        IdNumber: IdNumber,
        fecha_de_nacimiento: fecha_de_nacimiento,
        Edad: edad,
      },
    });

    return {
      message: 'Paciente creado exitosamente',
      pacientes,
    };
  }

  //============================================
  //               READ PACIENTE
  //============================================
  async findAll(): Promise<pacientes[]> {
    try {
      const pacientes = await this.prisma.pacientes.findMany();
      return pacientes;
    } catch (error: unknown) {
      throw new BadRequestException(
        'Error al buscar pacientes',
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  //============================================
  //               READ PROFILE
  //============================================
  async findOne(id: number): Promise<pacientes> {
    try {
      const paciente = await this.prisma.pacientes.findUnique({
        where: {
          id: id,
        },
      });
      if (!paciente) {
        throw new BadRequestException('Paciente no encontrado');
      }
      return paciente;
    } catch (error: unknown) {
      throw new BadRequestException(
        'Error al buscar paciente',
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  //============================================
  //               UPDATE PACIENTE
  //============================================
  async update(
    updatePacienteDto: UpdatePacienteDto,
  ): Promise<{ message: string; paciente: pacientes }> {
    try {
      const paciente = await this.prisma.pacientes.update({
        where: {
          IdNumber: updatePacienteDto.IdNumber,
        },
        data: updatePacienteDto,
      });
      if (!paciente) {
        throw new BadRequestException('Paciente no encontrado');
      }
      return {
        message: 'Perfil actualizado exitosamente',
        paciente,
      };
    } catch (error: unknown) {
      throw new BadRequestException(
        'Error al actualizar paciente',
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
