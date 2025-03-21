import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventsResolver } from './presentation/graphql/resolvers/events.resolver';
import { EventsRepository } from './infrastructure/repositories/events.repository';
import { CheckinUseCase } from './application/usecases/check-in.usecase';
import { CheckoutUseCase } from './application/usecases/check-out.usecase';
import { EventGqlMapper } from './presentation/graphql/object-mappers/event.gql.mapper';
import { GetEventsBySiteUseCase } from './application/usecases/get-events-by-site.usecase';
import { GetEventsByWorkerUseCase } from './application/usecases/get-events-by-worker.usecase';
import { ListEventsUseCase } from './application/usecases/list-events.usecase';
import { UsersResolver } from './presentation/graphql/resolvers/users.resolver';
import { SitesConsumerModule } from '../sites-consumer/sites-consumer.module';
import { UsersConsumerModule } from '../users-consumer/users-consumer.module';

@Module({
  imports: [PrismaModule, SitesConsumerModule, UsersConsumerModule],
  providers: [
    EventsResolver,
    UsersResolver,

    CheckinUseCase,
    CheckoutUseCase,
    GetEventsBySiteUseCase,
    GetEventsByWorkerUseCase,
    ListEventsUseCase,

    EventsRepository,

    // Mapper
    EventGqlMapper,
  ],
  exports: [],
})
export class EventsModule {}
