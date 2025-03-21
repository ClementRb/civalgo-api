import { Field, InputType } from '@nestjs/graphql';
import { Role } from 'src/prisma/role.enum';

@InputType()
export class FilterUsersInput {
  @Field({ nullable: true })
  role?: Role;
}
