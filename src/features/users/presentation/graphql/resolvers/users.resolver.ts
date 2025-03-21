import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserGql } from '../schema/users.gql.type';
import { SignUpInput } from '../schema/inputs/sign-up.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/features/auth/guard/gql-auth.guard';
import { GetUserUseCase } from 'src/features/users/application/usecases/get-user.usecase';
import { SignUpUseCase } from 'src/features/users/application/usecases/sign-up.usecase';
import { UserGqlMapper } from '../object-mapper/user.gql.mapper';
import { ListCheckInUsersUseCase } from 'src/features/users/application/usecases/list-check-in-users.usecase';
import { EventGql } from 'src/features/events/presentation/graphql/schema/events.gql.type';
import { GetEventsByWorkerUseCase } from 'src/features/events/application/usecases/get-events-by-worker.usecase';
import { EventGqlMapper } from 'src/features/events/presentation/graphql/object-mappers/event.gql.mapper';
import { GetWorkersUseCase } from 'src/features/users/application/usecases/get-workers.usecase';

@Resolver(() => UserGql)
export class UsersResolver {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly signUpUseCase: SignUpUseCase,
    private readonly userGqlMapper: UserGqlMapper,
    private readonly listCheckInUsersUseCase: ListCheckInUsersUseCase,
    private readonly getEventsByWorkerUseCase: GetEventsByWorkerUseCase,
    private readonly getWorkersUseCase: GetWorkersUseCase,
    private readonly eventGqlMapper: EventGqlMapper,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => UserGql)
  async user(@Args('userId') userId: string): Promise<UserGql> {
    const user = await this.getUserUseCase.execute(userId);

    return this.userGqlMapper.entityToGql(user);
  }

  @Mutation(() => UserGql)
  async signUp(
    @Args('signUpInput') signupInput: SignUpInput,
  ): Promise<UserGql> {
    const user = await this.signUpUseCase.execute(signupInput);

    return this.userGqlMapper.entityToGql(user);
  }

  @Query(() => [UserGql])
  async workers(): Promise<UserGql[]> {
    const users = await this.getWorkersUseCase.execute();

    return users.map((e) => this.userGqlMapper.entityToGql(e));
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [UserGql])
  async listCheckInUsers(): Promise<UserGql[]> {
    const users = await this.listCheckInUsersUseCase.execute();

    return users.map((e) => this.userGqlMapper.entityToGql(e));
  }

  @ResolveField('events', () => [EventGql])
  async site(@Parent() userGql: UserGql): Promise<EventGql[]> {
    const { id } = userGql;

    const events = await this.getEventsByWorkerUseCase.execute(id);

    return events.map((e) => this.eventGqlMapper.entityToGql(e));
  }
}
