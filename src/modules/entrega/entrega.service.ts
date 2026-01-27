import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/databases/prisma.service';

@Injectable()
export class EntregaService {
  constructor(private readonly prisma: PrismaService) {}
  //===================================
  //           traer todas las entregas
  //====================================
  findAll() {
    return this.prisma.entrega.findMany();
  }

  //==================================================
  //                     trae una entrega
  //=================================================
  findOne(id: number) {
    return this.prisma.entrega.findUnique({
      where: {
        id,
      },
    });
  }

  //==================================================
  //                     rechaza entrega
  //=================================================

  rechazar(id: number) {
    return this.prisma.entrega.update({
      where: {
        id,
      },
      data: {
        estado: 'no_recibido',
      },
    });
  }

  //==================================================
  //                     acepta entrega
  //=================================================

  aceptar(id: number) {
    return this.prisma.entrega.update({
      where: {
        id,
      },
      data: {
        estado: 'recibido',
      },
    });
  }
}
