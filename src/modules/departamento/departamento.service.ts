import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/databases/prisma.service';
@Injectable()
export class DepartamentoService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.departament.findMany();
  }
}
