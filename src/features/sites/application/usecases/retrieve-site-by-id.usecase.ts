import { Injectable } from '@nestjs/common';
import { SitesRepository } from '../../infrastructure/repositories/sites.repository';
import { Site } from '@prisma/client';

@Injectable()
export class RetrieveSiteByIdUseCase {
  constructor(private readonly sitesRepository: SitesRepository) {}

  async execute(siteId: string): Promise<Site> {
    const site = await this.sitesRepository.getById(siteId);

    if (!site) {
      throw new Error('Site not found');
    }

    return site;
  }
}
