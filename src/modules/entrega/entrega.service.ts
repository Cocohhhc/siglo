import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/databases/prisma.service';
import { estado, entrega } from '@prisma/client';

@Injectable()
export class EntregaService {
  constructor(private readonly prisma: PrismaService) {}
  //===================================
  //           traer todas las entregas
  //====================================
  async findAll(userId: number): Promise<entrega[]> {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const entregas = await this.prisma.entrega.findMany({
      where: {
        receptor_id: userId,
      },
      include: {
        pacientes: true,
        registro: {
          include: {
            departamento: true,
          },
        },
      },
    });
    if (!entregas) {
      throw new NotFoundException('Entregas no encontradas');
    }
    return entregas;
  }

  //=========================================
  // trae entregass enviadas por el usuarios
  //=========================================

  findAllEnviados(userId: number): Promise<entrega[]> {
    return this.prisma.entrega.findMany({
      where: {
        emisor_id: userId,
      },
      include: {
        pacientes: true,
        registro: {
          include: {
            departamento: true,
          },
        },
      },
    });
  }
  //==================================================
  //                     trae una entrega
  //=================================================
  async findOne(id: number): Promise<entrega> {
    const entrega = await this.prisma.entrega.findUnique({
      where: {
        id,
      },
      include: {
        pacientes: true,
        registro: {
          include: {
            departamento: true,
          },
        },
      },
    });
    if (!entrega) {
      throw new NotFoundException('Entrega no encontrada');
    }
    return entrega;
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
        estado: estado.no_recibido,
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
        estado: estado.recibido,
      },
    });
  }
}
