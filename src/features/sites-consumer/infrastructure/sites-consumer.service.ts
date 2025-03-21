import { Injectable } from '@nestjs/common';
import { Site } from '@prisma/client';
import { RetrieveSiteByIdUseCase } from 'src/features/sites/application/usecases/retrieve-site-by-id.usecase';

@Injectable()
export class SitesConsumerService {
  constructor(
    private readonly retrieveSiteByIdUseCase: RetrieveSiteByIdUseCase,
  ) {}

  async getById(siteId: string): Promise<Site> {
    return this.retrieveSiteByIdUseCase.execute(siteId);
  }
}
