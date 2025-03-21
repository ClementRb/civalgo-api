import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { EventGql } from 'src/features/events/presentation/graphql/schema/events.gql.type';

registerEnumType(Role, { name: 'Role' });

@ObjectType()
export class UserGql {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => Role)
  role: Role;

  @Field(() => EventGql)
  events: EventGql[];
}
