/* eslint-disable prettier/prettier */
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Author } from '../models/author.model';
import { AuthorService } from '../service/author.service';
import { BaseEntity, Repository } from 'typeorm';
import { Filter, FilterArgs } from 'nestjs-graphql-tools';
import { InjectRepository } from '@nestjs/typeorm';
import { Band } from '../models/band.model';

@Resolver((of: any) => Author)
export class AuthorResolver extends BaseEntity {
  constructor(private authorService: AuthorService,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Band) private bandRepository: Repository<Band>){
    super();
  }

  @Query((returns) => [Author])
  async authors (@Filter(() => [Author]) filter: FilterArgs) {
      const qb = this.authorRepository.createQueryBuilder('a')
      .where(filter)
      .distinct(true);

      return qb.getMany();
    } 

  @Mutation((returns) => Author)
  createAuthor(
    @Args({ name: 'name', type: () => String }) name: string,
    @Args({ name: 'email', type: () => String }) email: string,
  ) {
    return this.authorService.create({ name, email });
  }

  @ResolveField((returns) => [Band], { name: 'bands' } as any)
  async bands(@Parent() author: Author) {
    return this.bandRepository.find({
      where: {
        author: author,
      },
    });
  }
}
