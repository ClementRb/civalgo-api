import { Field } from '@nestjs/graphql';
import { EventType } from 'src/prisma/event.enum';

export class CreateEventInput {
  @Field(() => EventType)
  type: keyof typeof EventType;

  @Field()
  workerId: string;

  @Field()
  siteId: string;
}
