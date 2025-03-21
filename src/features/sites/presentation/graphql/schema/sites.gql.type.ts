import { Field, ID, ObjectType } from '@nestjs/graphql';
import { EventGql } from 'src/features/events/presentation/graphql/schema/events.gql.type';
import { UserGql } from 'src/features/users/presentation/graphql/schema/users.gql.type';

@ObjectType()
export class SiteGql {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  location?: string;

  @Field(() => [UserGql])
  workers: UserGql[];

  @Field(() => [EventGql])
  events: EventGql[];
}
