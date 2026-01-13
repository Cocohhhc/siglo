import { Module } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { PrismaModule } from 'src/databases/prisma.module';
import { CommonModule } from 'src/common/common.module';
@Module({
  imports: [PrismaModule, CommonModule],
  controllers: [PacientesController],
  providers: [PacientesService],
})
export class PacientesModule {}
