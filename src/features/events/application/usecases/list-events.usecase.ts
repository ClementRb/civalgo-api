import { Injectable } from '@nestjs/common';
import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { FilterEventsInput } from '../../presentation/graphql/schema/inputs/filter-events.input';
import { Event } from '@prisma/client';

@Injectable()
export class ListEventsUseCase {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async execute(filters: FilterEventsInput = {}): Promise<Event[]> {
    const eventList = await this.eventsRepository.list(filters);

    return eventList;
  }
}
