import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterEventsInput {
  @Field({ nullable: true })
  workerId?: string;

  @Field({ nullable: true })
  siteId?: string;

  @Field({ nullable: true })
  date?: string;
}
