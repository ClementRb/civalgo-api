import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CheckOutEventInput {
  @Field()
  userId: string;
}
