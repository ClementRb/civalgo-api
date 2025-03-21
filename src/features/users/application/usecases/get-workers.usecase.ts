import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from '../../infrastructure/repositories/users.repositories';
import { Role } from 'src/prisma/role.enum';

@Injectable()
export class GetWorkersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.list({ role: Role.WORKER });

    return users;
  }
}
