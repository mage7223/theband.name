import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Band } from '../models/band.model';
import { BandService } from '../service/bands.service';
import { BaseEntity, Like, Repository } from 'typeorm';
import { Filter, FilterArgs } from 'nestjs-graphql-tools';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver((of: any) => Band)
export class BandResolver extends BaseEntity {
  constructor(
    private bandService: BandService,
    @InjectRepository(Band) private bandRepository: Repository<Band>,
  ) {
    super();
  }

  @Query((returns) => Band, { name: 'band' })
  async getBandById(@Args('id', { type: () => Int }) id: number) {
    return this.bandService.findOne({
      where: {
        id,
      },
    });
  }

  @Query((returns) => Band, { name: 'band' })
  async band(@Filter(() => [Band]) filter: FilterArgs) {
    const qb = this.bandRepository
      .createQueryBuilder('b')
      .where(filter)
      .distinct(true);
    return qb.getMany();
  }

  @Query((returns) => [Band], { name: 'bands' })
  async getAllBands() {
    return this.bandService.findAll();
  }

  @Query((returns) => Band, { name: 'bandByName' })
  async getBandByName(@Args('name', { type: () => String }) name: string) {
    return this.bandService.findOne({
      where: {
        name: `${name}`,
      },
    });
  }

  @Query((returns) => [Band], { name: 'bandLikeName' })
  async getBandLikeName(@Args('name', { type: () => String }) name: string) {
    return this.bandService.findAny({
      where: {
        name: Like(`%${name}%`),
      },
    });
  }

  @Mutation((returns) => Band)
  createBand(@Args({ name: 'name', type: () => String }) name: string) {
    return this.bandService.create(name);
  }
}
``;
