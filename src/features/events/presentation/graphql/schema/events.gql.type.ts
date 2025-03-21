import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CheckInType } from '@prisma/client';
import { SiteGql } from 'src/features/sites/presentation/graphql/schema/sites.gql.type';
import { UserGql } from 'src/features/users/presentation/graphql/schema/users.gql.type';

registerEnumType(CheckInType, { name: 'CheckInType' });

@ObjectType()
export class EventGql {
  @Field(() => ID)
  id: string;

  @Field(() => UserGql)
  worker: UserGql;

  @Field()
  workerId: string;

  @Field(() => SiteGql)
  site: SiteGql;

  @Field()
  siteId: string;

  @Field()
  timestamp: Date;

  @Field(() => CheckInType)
  type: CheckInType;
}
