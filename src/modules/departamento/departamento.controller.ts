import { Controller, Get } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';

@Controller('departamento')
export class DepartamentoController {
  constructor(private readonly departamentoService: DepartamentoService) {}

  @Get('find_all')
  create() {
    return this.departamentoService.findAll();
  }
}
