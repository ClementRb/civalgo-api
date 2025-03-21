import { Injectable } from '@nestjs/common';
import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { Event } from '@prisma/client';

@Injectable()
export class GetEventsBySiteUseCase {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async execute(siteId: string): Promise<Event[]> {
    const eventList = await this.eventsRepository.listBySiteId(siteId);

    return eventList;
  }
}
