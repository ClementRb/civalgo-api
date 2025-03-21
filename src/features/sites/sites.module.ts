import { PrismaModule } from 'src/prisma/prisma.module';
import { SitesRepository } from './infrastructure/repositories/sites.repository';
import { Module } from '@nestjs/common';
import { RetrieveSiteByIdUseCase } from './application/usecases/retrieve-site-by-id.usecase';
import { PrismaService } from 'src/prisma/prisma.service';
import { SiteGqlMapper } from './presentation/graphql/object-mappers/site.gql.mapper';
import { SitesResolver } from './presentation/graphql/resolvers/sites.resolver';
import { CreateSiteUseCase } from './application/usecases/create-site.usecase';
import { ListSitesUseCase } from './application/usecases/list-sites.usecase';
import { EventsResolver } from './presentation/graphql/resolvers/events.resolver';

@Module({
  imports: [PrismaModule],
  providers: [
    SitesResolver,
    EventsResolver,

    CreateSiteUseCase,
    RetrieveSiteByIdUseCase,
    ListSitesUseCase,

    SiteGqlMapper,

    PrismaService,
    SitesRepository,
  ],
  exports: [RetrieveSiteByIdUseCase],
})
export class SitesModule {}
