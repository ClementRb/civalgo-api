import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../infrastructure/repositories/users.repositories';
import { User } from '@prisma/client';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.usersRepository.findOneById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
