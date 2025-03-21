import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';
import { CreateEventInput } from '../../presentation/graphql/schema/inputs/create-event.input';
import { FilterEventsInput } from '../../presentation/graphql/schema/inputs/filter-events.input';

@Injectable()
export class EventsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createEventInput: CreateEventInput): Promise<Event> {
    return this.prismaService.event.create({
      data: {
        siteId: createEventInput.siteId,
        type: createEventInput.type,
        workerId: createEventInput.workerId,
        timestamp: new Date(),
      },
    });
  }

  async listBySiteId(siteId: string): Promise<Event[]> {
    return this.prismaService.event.findMany({ where: { siteId } });
  }

  async listByWorkerId(workerId: string): Promise<Event[]> {
    return this.prismaService.event.findMany({
      orderBy: [{ timestamp: 'desc' }],
      where: { workerId },
    });
  }

  async list(filters: FilterEventsInput): Promise<Event[]> {
    const { workerId, siteId, date } = filters;

    return this.prismaService.event.findMany({
      where: {
        workerId: workerId,
        siteId: siteId,
        timestamp: date
          ? {
              gte: new Date(`${date}T00:00:00.000Z`),
              lt: new Date(`${date}T23:59:59.999Z`),
            }
          : undefined,
      },
      include: {
        worker: true,
        site: true,
      },
      orderBy: { timestamp: 'desc' },
    });
  }
}
