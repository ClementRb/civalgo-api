import { Role } from 'src/prisma/role.enum';
import { EventType } from 'src/prisma/event.enum';
import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { Event } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { SitesConsumerService } from 'src/features/sites-consumer/infrastructure/sites-consumer.service';
import { UsersConsumerService } from 'src/features/users-consumer/infrastructure/users-consumer.service';

@Injectable()
export class CheckinUseCase {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly sitesConsumerService: SitesConsumerService,
    private readonly usersConsumerService: UsersConsumerService,
  ) {}

  async execute(userName: string, siteId: string): Promise<Event> {
    const site = await this.sitesConsumerService.getById(siteId);

    const user = await this.usersConsumerService.findOneByName(userName);

    if (user.role === Role.SUPERVISOR) {
      throw new Error('User cannot check in');
    }

    const event = await this.eventsRepository.create({
      type: EventType.CHECK_IN,
      siteId: site.id,
      workerId: user.id,
    });

    if (!event) {
      throw new Error('Error creating event');
    }

    return event;
  }
}
