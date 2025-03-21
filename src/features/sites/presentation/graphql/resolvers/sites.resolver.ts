import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SiteGql } from '../schema/sites.gql.type';
import { CreateSiteInput } from '../schema/inputs/create-site.input';
import { CreateSiteUseCase } from 'src/features/sites/application/usecases/create-site.usecase';
import { SiteGqlMapper } from '../object-mappers/site.gql.mapper';
import { ListSitesUseCase } from 'src/features/sites/application/usecases/list-sites.usecase';

@Resolver(() => SiteGql)
export class SitesResolver {
  constructor(
    private readonly createSiteUseCase: CreateSiteUseCase,
    private readonly siteGqlMapper: SiteGqlMapper,
    private readonly listSitesUseCase: ListSitesUseCase,
  ) {}

  @Mutation(() => SiteGql)
  async createSite(
    @Args('createSiteInput') createSiteInput: CreateSiteInput,
  ): Promise<SiteGql> {
    const site = await this.createSiteUseCase.execute(createSiteInput.name);

    return this.siteGqlMapper.entityToGql(site);
  }

  @Query(() => [SiteGql])
  async sites(): Promise<SiteGql[]> {
    const sites = await this.listSitesUseCase.execute();

    return sites.map((e) => this.siteGqlMapper.entityToGql(e));
  }
}
