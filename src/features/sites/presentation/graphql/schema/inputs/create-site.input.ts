import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSiteInput {
  @Field()
  name: string;
}
