import { Module } from '@nestjs/common';

import { ValidarCedulaService } from './validarCedula.service';

@Module({
  providers: [ValidarCedulaService],
  exports: [ValidarCedulaService],
})

export class CommonModule {}