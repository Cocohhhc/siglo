import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/databases/prisma.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
@Injectable()
export class DepartamentoService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.departament.findMany();
  }
  async create(data: CreateDepartamentoDto) {
    return await this.prisma.departament.create({
      data: {
        name: data.nombre,
      },
    });
  }

  async findOne(id: number) {
    const departamento = await this.prisma.departament.findUnique({
      where: {
        id,
      },
    });
    if (!departamento) {
      throw new NotFoundException('Departamento no encontrado');
    }
    return departamento;
  }
}
