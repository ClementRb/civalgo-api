import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.services';
import { AuthResponse } from '../dto/auth.response';
import { AuthInput } from '../dto/auth.input';
import { UserGqlMapper } from 'src/features/users/presentation/graphql/object-mapper/user.gql.mapper';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userGqlMapper: UserGqlMapper,
  ) {}

  @Mutation(() => AuthResponse)
  async login(@Args('authInput') authInput: AuthInput) {
    const user = await this.authService.validateUser(
      authInput.email,
      authInput.password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const authResponse = this.authService.login(user);

    return {
      user: this.userGqlMapper.entityToGql(authResponse.user),
      access_token: authResponse.access_token,
    };
  }
}
