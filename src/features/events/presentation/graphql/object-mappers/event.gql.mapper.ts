import { Event } from '@prisma/client';
import { EventGql } from '../schema/events.gql.type';

export class EventGqlMapper {
  constructor() {}

  public entityToGql(entity: Event): EventGql {
    return {
      // site and worker will be resolved in a ResolveField
      id: entity.id,
      siteId: entity.siteId,
      timestamp: entity.timestamp,
      type: entity.type,
      workerId: entity.workerId,
    } as EventGql;
  }
}
