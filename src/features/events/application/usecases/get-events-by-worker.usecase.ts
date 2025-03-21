import { Injectable } from '@nestjs/common';
import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { Event } from '@prisma/client';

@Injectable()
export class GetEventsByWorkerUseCase {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async execute(workerId: string): Promise<Event[]> {
    const eventList = await this.eventsRepository.listByWorkerId(workerId);

    return eventList;
  }
}
