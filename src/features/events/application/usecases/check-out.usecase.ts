import { Role } from 'src/prisma/role.enum';
import { EventType } from 'src/prisma/event.enum';
import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { Injectable } from '@nestjs/common';
import { SitesConsumerService } from 'src/features/sites-consumer/infrastructure/sites-consumer.service';
import { UsersConsumerService } from 'src/features/users-consumer/infrastructure/users-consumer.service';

@Injectable()
export class CheckoutUseCase {
  constructor(
    private readonly sitesConsumerService: SitesConsumerService,
    private readonly usersConsumerService: UsersConsumerService,
    private readonly eventsRepository: EventsRepository,
  ) {}

  async execute(userName: string, siteId: string) {
    const site = await this.sitesConsumerService.getById(siteId);

    const user = await this.usersConsumerService.findOneByName(userName);

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
