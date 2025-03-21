import { Injectable } from '@nestjs/common';
import { SitesRepository } from '../../infrastructure/repositories/sites.repository';
import { Site } from '@prisma/client';

@Injectable()
export class CreateSiteUseCase {
  constructor(private readonly sitesRepository: SitesRepository) {}

  async execute(siteName: string): Promise<Site> {
    const user = await this.sitesRepository.create(siteName);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
