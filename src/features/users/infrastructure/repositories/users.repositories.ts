import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/prisma/role.enum';
import { Injectable } from '@nestjs/common';
import { FilterUsersInput } from '../../presentation/graphql/schema/inputs/filter-users.input';

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async findOneByName(name: string): Promise<User | null> {
    return await this.prismaService.user.findFirst({
      where: { name },
    });
  }

  async findOneById(id: string): Promise<User | null> {
    return this.prismaService.user.findFirst({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findFirst({ where: { email } });
  }

  async list(filters: FilterUsersInput): Promise<User[]> {
    const { role } = filters;

    return this.prismaService.user.findMany({ where: { role } });
  }

  async create(
    password: string,
    email: string,
    name: string,
    role: Role,
  ): Promise<User> {
    return this.prismaService.user.create({
      data: {
        password: password,
        email: email,
        name: name,
        role: role,
      },
    });
  }

  async listCheckInUsers(): Promise<User[]> {
    // Can't do it in a single prisma query,
    // we can avoid filtering it in javascript
    return this.prismaService.$queryRaw`
      SELECT u.*
      FROM "users" u
      WHERE (
        SELECT e."type"
        FROM "events" e
        WHERE e.worker_id = u.id
        ORDER BY e.timestamp DESC
        LIMIT 1
      ) = 'CHECK_IN'
    `;
  }
}
