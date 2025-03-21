import { Module } from '@nestjs/common';
import { UsersResolver } from './presentation/graphql/resolvers/users.resolver';
import { UsersRepository } from './infrastructure/repositories/users.repositories';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
import { SitesRepository } from '../sites/infrastructure/repositories/sites.repository';
import { EventsRepository } from '../events/infrastructure/repositories/events.repository';
import { GetUserUseCase } from './application/usecases/get-user.usecase';
import { SignUpUseCase } from './application/usecases/sign-up.usecase';
import { ListCheckInUsersUseCase } from './application/usecases/list-check-in-users.usecase';
import { UserGqlMapper } from './presentation/graphql/object-mapper/user.gql.mapper';
import { GetEventsByWorkerUseCase } from '../events/application/usecases/get-events-by-worker.usecase';
import { EventGqlMapper } from '../events/presentation/graphql/object-mappers/event.gql.mapper';
import { GetWorkersUseCase } from './application/usecases/get-workers.usecase';

@Module({
  imports: [PrismaModule],
  providers: [
    UsersResolver,
    UsersRepository,
    PrismaService,
    SitesRepository,
    EventsRepository,
    GetUserUseCase,
    SignUpUseCase,
    ListCheckInUsersUseCase,
    GetEventsByWorkerUseCase,
    GetWorkersUseCase,
    EventGqlMapper,
    UserGqlMapper,
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
