import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SiteGql } from '../schema/sites.gql.type';
import { SiteGqlMapper } from '../object-mappers/site.gql.mapper';
import { EventGql } from 'src/features/events/presentation/graphql/schema/events.gql.type';
import { RetrieveSiteByIdUseCase } from '../../../application/usecases/retrieve-site-by-id.usecase';

@Resolver(() => EventGql)
export class EventsResolver {
  constructor(
    private readonly siteGqlMapper: SiteGqlMapper,
    private readonly retrieveSiteByIdUseCase: RetrieveSiteByIdUseCase,
  ) {}

  @ResolveField('site', () => SiteGql)
  async site(@Parent() eventGql: EventGql): Promise<SiteGql> {
    const { siteId } = eventGql;

    const site = await this.retrieveSiteByIdUseCase.execute(siteId);

    return this.siteGqlMapper.entityToGql(site);
  }
}
