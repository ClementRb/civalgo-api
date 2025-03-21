import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../infrastructure/repositories/users.repositories';
import { User } from '@prisma/client';

@Injectable()
export class GetUserByNameUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userName: string): Promise<User> {
    const user = await this.usersRepository.findOneByName(userName);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
