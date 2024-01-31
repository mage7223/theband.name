import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BandService } from '../service/bands.service';
import { Band } from '../models/band.model';
import { BaseEntity, Like } from 'typeorm';

@Resolver((of: any) => Band)
export class BandResolver extends BaseEntity {
  constructor(private bandService: BandService) {
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
