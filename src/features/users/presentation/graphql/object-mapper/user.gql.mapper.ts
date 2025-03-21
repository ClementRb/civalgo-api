import { User } from '@prisma/client';
import { UserGql } from '../schema/users.gql.type';

export class UserGqlMapper {
  constructor() {}

  public entityToGql(entity: User): UserGql {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      role: entity.role,
    } as UserGql;
  }
}
