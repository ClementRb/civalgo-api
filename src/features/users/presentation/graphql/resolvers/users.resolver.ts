import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserGql } from '../schema/users.gql.type';
import { SignUpInput } from '../schema/inputs/sign-up.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/features/auth/guard/gql-auth.guard';
import { GetUserUseCase } from 'src/features/users/application/usecases/get-user.usecase';
import { SignUpUseCase } from 'src/features/users/application/usecases/sign-up.usecase';
import { UserGqlMapper } from '../object-mapper/user.gql.mapper';
import { ListCheckInUsersUseCase } from 'src/features/users/application/usecases/list-check-in-users.usecase';
import { GetWorkersUseCase } from 'src/features/users/application/usecases/get-workers.usecase';

@Resolver(() => UserGql)
export class UsersResolver {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly signUpUseCase: SignUpUseCase,
    private readonly userGqlMapper: UserGqlMapper,
    private readonly listCheckInUsersUseCase: ListCheckInUsersUseCase,
    private readonly getWorkersUseCase: GetWorkersUseCase,
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
}
