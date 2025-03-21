import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../infrastructure/repositories/users.repositories';
import { User } from '@prisma/client';

@Injectable()
export class ListCheckInUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.listCheckInUsers();

    return users;
  }
}
