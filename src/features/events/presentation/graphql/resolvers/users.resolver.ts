import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { EventGql } from '../schema/events.gql.type';
import { EventGqlMapper } from '../object-mappers/event.gql.mapper';
import { UserGql } from 'src/features/users/presentation/graphql/schema/users.gql.type';
import { GetEventsByWorkerUseCase } from '../../../application/usecases/get-events-by-worker.usecase';

@Resolver(() => UserGql)
export class UsersResolver {
  constructor(
    private readonly eventGqlMapper: EventGqlMapper,
    private readonly getEventsByWorkerUseCase: GetEventsByWorkerUseCase,
  ) {}

  @ResolveField('events', () => [EventGql])
  async site(@Parent() userGql: UserGql): Promise<EventGql[]> {
    const { id } = userGql;

    const events = await this.getEventsByWorkerUseCase.execute(id);

    return events.map((e) => this.eventGqlMapper.entityToGql(e));
  }
}
