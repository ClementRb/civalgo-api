import { SitesRepository } from 'src/features/sites/infrastructure/repositories/sites.repository';
import { Role } from 'src/prisma/role.enum';
import { EventType } from 'src/prisma/event.enum';
import { UsersRepository } from 'src/features/users/infrastructure/repositories/users.repositories';
import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { Event } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckinUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly sitesRepository: SitesRepository,
    private readonly eventsRepository: EventsRepository,
  ) {}

  async execute(userName: string, siteId: string): Promise<Event> {
    const site = await this.sitesRepository.getById(siteId);
    if (!site) {
      throw new Error('Site not found');
    }

    const user = await this.usersRepository.findOneByName(userName);
    if (!user) {
      throw new Error('User not found');
    }

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
