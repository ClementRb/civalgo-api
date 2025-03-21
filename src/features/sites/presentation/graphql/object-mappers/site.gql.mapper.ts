import { Site } from '@prisma/client';
import { SiteGql } from '../schema/sites.gql.type';

export class SiteGqlMapper {
  constructor() {}

  public entityToGql(entity: Site): SiteGql {
    return {
      id: entity.id,
      name: entity.name,
      location: entity.location,
    } as SiteGql;
  }
}
