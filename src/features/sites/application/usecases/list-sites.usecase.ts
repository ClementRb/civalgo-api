import { Injectable } from '@nestjs/common';
import { SitesRepository } from '../../infrastructure/repositories/sites.repository';
import { Site } from '@prisma/client';

@Injectable()
export class ListSitesUseCase {
  constructor(private readonly sitesRepository: SitesRepository) {}

  async execute(): Promise<Site[]> {
    const sites = await this.sitesRepository.getAll();

    return sites;
  }
}
