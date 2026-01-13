import { Module } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';
import { PrismaModule } from 'src/databases/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [RegistroController],
  providers: [RegistroService],
})
export class RegistroModule {}
