import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUserByNameUseCase } from 'src/features/users/application/usecases/get-user-by-name.usecase';

@Injectable()
export class UsersConsumerService {
  constructor(private readonly getUserByNameUseCase: GetUserByNameUseCase) {}

  async findOneByName(siteId: string): Promise<User> {
    return await this.getUserByNameUseCase.execute(siteId);
  }
}
