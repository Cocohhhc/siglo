import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { users } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<users[]> {
    return this.usersService.findAll();
  }

}
