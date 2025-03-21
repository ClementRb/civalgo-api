import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { EventGql } from '../schema/events.gql.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/features/auth/guard/gql-auth.guard';
import { CheckEventInput } from '../schema/inputs/check-in-event.input';
import { CheckinUseCase } from 'src/features/events/application/usecases/check-in.usecase';
import { RetrieveSiteByIdUseCase } from 'src/features/sites/application/usecases/retrieve-site-by-id.usecase';
import { EventGqlMapper } from '../object-mappers/event.gql.mapper';
import { SiteGql } from 'src/features/sites/presentation/graphql/schema/sites.gql.type';
import { UserGql } from 'src/features/users/presentation/graphql/schema/users.gql.type';
import { GetUserUseCase } from 'src/features/users/application/usecases/get-user.usecase';
import { CheckoutUseCase } from 'src/features/events/application/usecases/check-out.usecase';
import { GetEventsBySiteUseCase } from 'src/features/events/application/usecases/get-events-by-site.usecase';
import { GetEventsByWorkerUseCase } from 'src/features/events/application/usecases/get-events-by-worker.usecase';
import { SiteGqlMapper } from 'src/features/sites/presentation/graphql/object-mappers/site.gql.mapper';
import { UserGqlMapper } from 'src/features/users/presentation/graphql/object-mapper/user.gql.mapper';
import { FilterEventsInput } from '../schema/inputs/filter-events.input';
import { ListEventsUseCase } from 'src/features/events/application/usecases/list-events.usecase';

@Resolver(() => EventGql)
export class EventsResolver {
  constructor(
    private readonly checkInUsecase: CheckinUseCase,
    private readonly checkOutUsecase: CheckoutUseCase,
    private readonly retrieveSiteByIdUseCase: RetrieveSiteByIdUseCase,
    private readonly eventGqlMapper: EventGqlMapper,
    private readonly siteGqlMapper: SiteGqlMapper,
    private readonly userGqlMapper: UserGqlMapper,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getEventsBySiteUseCase: GetEventsBySiteUseCase,
    private readonly getEventsByWorkerUseCase: GetEventsByWorkerUseCase,
    private readonly listEventsUseCase: ListEventsUseCase,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => EventGql)
  async checkIn(
    @Args('checkEventInput') checkEventInput: CheckEventInput,
  ): Promise<EventGql> {
    const eventData = await this.checkInUsecase.execute(
      checkEventInput.userName,
      checkEventInput.siteId,
    );

    if (!eventData) {
      throw new Error('Error creating event');
    }

    return this.eventGqlMapper.entityToGql(eventData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => EventGql)
  async checkOut(
    @Args('checkEventInput') checkEventInput: CheckEventInput,
  ): Promise<EventGql> {
    const eventData = await this.checkOutUsecase.execute(
      checkEventInput.userName,
      checkEventInput.siteId,
    );

    if (!eventData) {
      throw new Error('Error creating event');
    }

    return this.eventGqlMapper.entityToGql(eventData);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [EventGql])
  async eventsBySiteId(@Args('siteId') siteId: string): Promise<EventGql[]> {
    const events = await this.getEventsBySiteUseCase.execute(siteId);

    return events.map((e) => this.eventGqlMapper.entityToGql(e));
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [EventGql])
  async listEvents(@Args('filters') filters: FilterEventsInput) {
    const events = await this.listEventsUseCase.execute(filters);

    return events.map((e) => this.eventGqlMapper.entityToGql(e));
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [EventGql])
  async eventsByWorkerId(
    @Args('workerId') workerId: string,
  ): Promise<EventGql[]> {
    const events = await this.getEventsByWorkerUseCase.execute(workerId);

    return events.map((e) => this.eventGqlMapper.entityToGql(e));
  }

  @ResolveField('site', () => SiteGql)
  async site(@Parent() eventGql: EventGql): Promise<SiteGql> {
    const { siteId } = eventGql;

    const site = await this.retrieveSiteByIdUseCase.execute(siteId);

    return this.siteGqlMapper.entityToGql(site);
  }

  @ResolveField('worker', () => UserGql)
  async worker(@Parent() eventGql: EventGql): Promise<UserGql> {
    const { workerId } = eventGql;

    const user = await this.getUserUseCase.execute(workerId);

    return this.userGqlMapper.entityToGql(user);
  }
}
