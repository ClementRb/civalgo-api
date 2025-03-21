import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventGql } from '../schema/events.gql.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/features/auth/guard/gql-auth.guard';
import { CheckEventInput } from '../schema/inputs/check-in-event.input';
import { CheckinUseCase } from '../../../application/usecases/check-in.usecase';
import { EventGqlMapper } from '../object-mappers/event.gql.mapper';
import { CheckoutUseCase } from '../../..//application/usecases/check-out.usecase';
import { GetEventsBySiteUseCase } from '../../../application/usecases/get-events-by-site.usecase';
import { GetEventsByWorkerUseCase } from '../../../application/usecases/get-events-by-worker.usecase';
import { FilterEventsInput } from '../schema/inputs/filter-events.input';
import { ListEventsUseCase } from '../../../application/usecases/list-events.usecase';

@Resolver(() => EventGql)
export class EventsResolver {
  constructor(
    private readonly checkInUsecase: CheckinUseCase,
    private readonly checkOutUsecase: CheckoutUseCase,
    private readonly eventGqlMapper: EventGqlMapper,
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
}
