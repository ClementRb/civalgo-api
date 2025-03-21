import { Module } from '@nestjs/common';
import { UsersResolver } from './presentation/graphql/resolvers/users.resolver';
import { UsersRepository } from './infrastructure/repositories/users.repositories';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
import { GetUserUseCase } from './application/usecases/get-user.usecase';
import { SignUpUseCase } from './application/usecases/sign-up.usecase';
import { ListCheckInUsersUseCase } from './application/usecases/list-check-in-users.usecase';
import { UserGqlMapper } from './presentation/graphql/object-mapper/user.gql.mapper';
import { GetWorkersUseCase } from './application/usecases/get-workers.usecase';
import { EventsResolver } from './presentation/graphql/resolvers/events.resolver';
import { GetUserByNameUseCase } from './application/usecases/get-user-by-name.usecase';

@Module({
  imports: [PrismaModule],
  providers: [
    UsersResolver,
    EventsResolver,

    UsersRepository,

    PrismaService,

    GetUserUseCase,
    SignUpUseCase,
    ListCheckInUsersUseCase,
    GetWorkersUseCase,
    GetUserByNameUseCase,

    UserGqlMapper,
  ],
  exports: [GetUserByNameUseCase],
})
export class UsersModule {}
