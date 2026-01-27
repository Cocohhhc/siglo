import { Module } from '@nestjs/common';
import { EntregaService } from './entrega.service';
import { EntregaController } from './entrega.controller';
import { PrismaModule } from 'src/databases/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EntregaController],
  providers: [EntregaService],
})
export class EntregaModule {}
