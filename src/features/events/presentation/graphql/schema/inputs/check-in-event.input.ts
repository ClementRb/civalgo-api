import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CheckEventInput {
  @Field()
  userName: string;

  @Field()
  siteId: string;
}
