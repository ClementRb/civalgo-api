import { Role } from 'src/prisma/role.enum';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from '../../infrastructure/repositories/users.repositories';
import { SignUpInput } from '../../presentation/graphql/schema/inputs/sign-up.input';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignUpUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(signupInput: SignUpInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(signupInput.password, 10);

    return await this.usersRepository.create(
      hashedPassword,
      signupInput.email,
      signupInput.name,
      signupInput.role ? signupInput.role : Role.WORKER,
    );
  }
}
