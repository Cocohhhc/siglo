import { Module } from '@nestjs/common';
import { RegistroModule } from './modules/registro/registro.module';
import { PacientesModule } from './modules/pacientes/pacientes.module';
import { DepartamentoModule } from './modules/departamento/departamento.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { EntregaModule } from './modules/entrega/entrega.module';
import {UsersModule} from './modules/users/users.module';
@Module({
  imports: [
    RegistroModule,
    PacientesModule,
    DepartamentoModule,
    EntregaModule,
    UsersModule,
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        throttlers: [
          {
            ttl: 60,
            limit: 100,
          },
        ],
      }),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
