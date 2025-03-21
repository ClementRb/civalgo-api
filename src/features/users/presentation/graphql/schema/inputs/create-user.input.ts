import { Field, InputType } from '@nestjs/graphql';
import { Role } from 'src/prisma/role.enum';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Role)
  role: keyof typeof Role;
}
