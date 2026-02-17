import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/databases/prisma.service';
import { users} from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<users[]> {
   return this.prisma.users.findMany();
  }

}
