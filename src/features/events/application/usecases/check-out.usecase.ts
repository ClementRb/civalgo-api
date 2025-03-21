import { UsersRepository } from 'src/features/users/infrastructure/repositories/users.repositories';
import { Role } from 'src/prisma/role.enum';
import { EventType } from 'src/prisma/event.enum';
import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { SitesRepository } from 'src/features/sites/infrastructure/repositories/sites.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckoutUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly sitesRepository: SitesRepository,
    private readonly eventsRepository: EventsRepository,
  ) {}

  async execute(userName: string, siteId: string) {
    const site = await this.sitesRepository.getById(siteId);
    if (!site) {
      throw new Error('Site not found');
    }

    const user = await this.usersRepository.findOneByName(userName);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.role === Role.SUPERVISOR) {
      throw new Error('User cannot check out');
    }

    const event = await this.eventsRepository.create({
      type: EventType.CHECK_OUT,
      siteId: site.id,
      workerId: user.id,
    });

    if (!event) {
      throw new Error('Error creating event');
    }

    return event;
  }
}
