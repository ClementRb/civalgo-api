import { Field, ObjectType } from '@nestjs/graphql';
import { UserGql } from 'src/features/users/presentation/graphql/schema/users.gql.type';

@ObjectType()
export class AuthResponse {
  @Field()
  access_token: string;

  @Field()
  user: UserGql;
}
