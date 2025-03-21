import { InputType, Field } from '@nestjs/graphql';
import { Role } from 'src/prisma/role.enum';

@InputType()
export class SignUpInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role?: Role;
}
