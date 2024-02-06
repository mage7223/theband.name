import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Band } from '../models/band.model';
import { BandService } from '../service/bands.service';
import { BaseEntity, FindManyOptions, Repository } from 'typeorm';
import { Filter } from 'nestjs-graphql-tools';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../models/author.model';
import { CreateBandType } from '../models/band.create.model';

@Resolver((of: any) => Band)
export class BandResolver extends BaseEntity {
  constructor(
    private bandService: BandService,
    @InjectRepository(Band) private bandRepository: Repository<Band>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {
    super();
  }

  @Query((returns) => [Band], { name: 'bands' })
  async bands(@Filter(() => [Band]) filter: FindManyOptions<Band>[]) {
    return this.bandRepository
      .createQueryBuilder()
      .where(filter)
      .distinct(true)
      .getMany();
  }

  @ResolveField((returns) => Author, { name: 'author' })
  async author(@Parent() band: Band) {
    return this.authorRepository.findOne({
      where: {
        bands: band,
      },
    });
  }

  @Mutation((returns) => Band)
  async createBand(@Args('band') band: CreateBandType) {
    const newBand = new Band(band.name, band.authorEmail);
    const author: Author = await this.authorRepository
      .findOneOrFail({ where: { email: band.authorEmail } })
      .then((newAuthor) => {
        return newAuthor;
      })
      .catch(() => {
        return this.authorRepository.save(new Author(band.authorEmail));
      });
    newBand.author = author;
    return this.bandRepository.save(newBand);
  }
}
