import { Injectable } from '@nestjs/common';
import { Site } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SitesRepository {
  constructor(private prismaService: PrismaService) {}

  async create(name: string): Promise<Site> {
    return this.prismaService.site.create({
      data: {
        name,
      },
    });
  }

  async getById(id: string): Promise<Site | null> {
    return this.prismaService.site.findFirst({ where: { id } });
  }

  async getAll(): Promise<Site[]> {
    return this.prismaService.site.findMany();
  }
}
