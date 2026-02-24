import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/databases/prisma.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { registro, departament, pacientes, estado } from '@prisma/client';

@Injectable()
export class RegistroService {
  constructor(private readonly prisma: PrismaService) {}

  //============================================
  //               CREATE REGISTRO + ENTREGA
  //============================================
  async create(createRegistroDto: CreateRegistroDto): Promise<registro> {
    const { paciente_id, emisor_id, receptor_id } = createRegistroDto;

    // Validar paciente
    const paciente = await this.prisma.pacientes.findUnique({
      where: { id: paciente_id },
    });
    if (!paciente) {
      throw new BadRequestException('Paciente no encontrado');
    }

    // IDs para emisor/receptor: o vienen en el DTO, o fallback a 1/2 (iguala a lo que ya usabas)
    const EMISOR_ID = typeof emisor_id === 'number' ? emisor_id : 1;
    const RECEPTOR_ID = typeof receptor_id === 'number' ? receptor_id : 2;

    // Validar existencia de emisor y receptor
    const emisor = await this.prisma.users.findUnique({
      where: { id: EMISOR_ID },
    });
    if (!emisor) {
      throw new BadRequestException(`Emisor (${EMISOR_ID}) no existe`);
    }
    const receptor = await this.prisma.users.findUnique({
      where: { id: RECEPTOR_ID },
    });
    if (!receptor) {
      throw new BadRequestException(`Receptor (${RECEPTOR_ID}) no existe`);
    }

    // Transacción interactiva: crear registro y luego entrega (conectar por id del registro creado)
    const result = await this.prisma.$transaction(async (tx) => {
      const registro = await tx.registro.create({
        data: {
          departamento: {
            connect: { id: receptor.departamentoId },
          },
          paciente: {
            connect: { id: paciente_id },
          },
        },
      });

      // Crear la entrega conectando las relaciones correctas.
      // Asegúrate de que en schema.prisma los nombres relacionales sean estos:
      // emisor, receptor, pacientes, registro
      await tx.entrega.create({
        data: {
          emisor: {
            connect: { id: EMISOR_ID },
          },
          receptor: {
            connect: { id: RECEPTOR_ID },
          },
          pacientes: {
            connect: { id: paciente_id },
          },
          registro: {
            connect: { id: registro.id },
          },
        },
      });

      return registro;
    });

    return result;
  }

  //============================================
  //               READ REGISTRO
  //============================================
  async findOne(id: number): Promise<{
    departamento: departament;
    paciente: pacientes;
    registros: registro[];
  }> {
    const departamento = await this.prisma.departament.findUnique({
      where: { id },
    });

    if (!departamento) {
      throw new BadRequestException('Departamento no encontrado');
    }

    const paciente = await this.prisma.pacientes.findUnique({
      where: { id },
    });

    if (!paciente) {
      throw new BadRequestException('Paciente no encontrado');
    }

    const registros = await this.prisma.registro.findMany({
      where: {
        departamento_id: id,
      },
    });

    return { departamento, paciente, registros };
  }
}
