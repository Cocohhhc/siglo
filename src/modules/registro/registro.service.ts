import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { PrismaService } from 'src/databases/prisma.service';
import { registro, pacientes, departament } from '@prisma/client';
@Injectable()
export class RegistroService {
  constructor(private readonly prisma: PrismaService) {}
  //============================================
  //               CREATE REGISTRO
  //============================================
  async create(createRegistroDto: CreateRegistroDto): Promise<registro> {
    const verifyDepartamento = await this.prisma.departament.findUnique({
      where: {
        id: createRegistroDto.departamento_id,
      },
    });
    if (!verifyDepartamento) {
      throw new BadRequestException('Departamento no encontrado');
    }

    const verifiUser = await this.prisma.pacientes.findUnique({
      where: {
        id: createRegistroDto.paciente_id,
      },
    });
    if (!verifiUser) {
      throw new Error('Paciente no encontrado');
    }

    const registro = await this.prisma.registro.create({
      data: {
        departamento: {
          connect: {
            id: createRegistroDto.departamento_id,
          },
        },
        paciente: {
          connect: {
            id: createRegistroDto.paciente_id,
          },
        },
      },
    });

    await this.prisma.entrega.create({
      data: {
        emisor_id: 1,
        receptor_id: 2,
        registro_id: registro.id,
      },
    });
    return registro;
  }

  //============================================
  //               READ REGISTRO
  //============================================
  async findOne(id: number): Promise<{
    departamento: departament;
    paciente: pacientes;
    registro: registro[];
  }> {
    const departamento = await this.prisma.departament.findUnique({
      where: {
        id,
      },
    });

    if (!departamento) {
      throw new BadRequestException('Departamento no encontrado');
    }

    const paciente = await this.prisma.pacientes.findUnique({
      where: {
        id,
      },
    });

    if (!paciente) {
      throw new Error('Paciente no encontrado');
    }

    const registro = await this.prisma.registro.findMany({
      where: {
        departamento: {
          id,
        },
      },
    });

    if (!registro) {
      throw new BadRequestException('Registro no encontrado');
    }

    return { departamento, paciente, registro };
  }
}
