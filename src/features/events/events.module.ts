import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventsResolver } from './presentation/graphql/resolvers/events.resolver';
import { EventsRepository } from './infrastructure/repositories/events.repository';
import { CheckinUseCase } from './application/usecases/check-in.usecase';
import { CheckoutUseCase } from './application/usecases/check-out.usecase';
import { RetrieveSiteByIdUseCase } from '../sites/application/usecases/retrieve-site-by-id.usecase';
import { EventGqlMapper } from './presentation/graphql/object-mappers/event.gql.mapper';
import { UsersRepository } from '../users/infrastructure/repositories/users.repositories';
import { GetUserUseCase } from '../users/application/usecases/get-user.usecase';
import { GetEventsBySiteUseCase } from './application/usecases/get-events-by-site.usecase';
import { GetEventsByWorkerUseCase } from './application/usecases/get-events-by-worker.usecase';
import { UserGqlMapper } from '../users/presentation/graphql/object-mapper/user.gql.mapper';
import { SiteGqlMapper } from '../sites/presentation/graphql/object-mappers/site.gql.mapper';
import { SitesRepository } from '../sites/infrastructure/repositories/sites.repository';
import { ListEventsUseCase } from './application/usecases/list-events.usecase';

@Module({
  imports: [PrismaModule],
  providers: [
    EventsResolver,
    EventsRepository,
    CheckinUseCase,
    CheckoutUseCase,
    GetUserUseCase,
    RetrieveSiteByIdUseCase,
    GetEventsBySiteUseCase,
    GetEventsByWorkerUseCase,
    ListEventsUseCase,
    UsersRepository,
    SitesRepository,

    // Mapper
    EventGqlMapper,
    UserGqlMapper,
    SiteGqlMapper,
  ],
  exports: [EventsRepository],
})
export class EventsModule {}
