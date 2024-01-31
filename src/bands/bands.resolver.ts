import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BandService } from './bands.service';
import { Band } from './models/band.model';
import { FindOneOptions } from 'typeorm';

@Resolver((of: any) => Band)
export class BandResolver {
  constructor(private bandService: BandService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World';
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

  @Mutation((returns) => Band)
  createBand(@Args({ name: 'name', type: () => String }) name: string) {
    return this.bandService.create(name);
  }
}
``;
