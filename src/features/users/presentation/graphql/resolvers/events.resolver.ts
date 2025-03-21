import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserGql } from '../schema/users.gql.type';
import { GetUserUseCase } from '../../../application/usecases/get-user.usecase';
import { UserGqlMapper } from '../object-mapper/user.gql.mapper';
import { EventGql } from 'src/features/events/presentation/graphql/schema/events.gql.type';

@Resolver(() => EventGql)
export class EventsResolver {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly userGqlMapper: UserGqlMapper,
  ) {}

  @ResolveField('worker', () => UserGql)
  async worker(@Parent() eventGql: EventGql): Promise<UserGql> {
    const { workerId } = eventGql;

    const user = await this.getUserUseCase.execute(workerId);

    return this.userGqlMapper.entityToGql(user);
  }
}
