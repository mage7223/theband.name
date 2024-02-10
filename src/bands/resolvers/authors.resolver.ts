/* eslint-disable prettier/prettier */
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { Author } from '../models/author.model';
import { AuthorService } from '../service/author.service';
import { BaseEntity, Repository } from 'typeorm';
import { Filter, FilterArgs } from 'nestjs-graphql-tools';
import { InjectRepository } from '@nestjs/typeorm';
import { Band } from '../models/band.model';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

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
  async createAuthor(
    @Args({ name: 'name', type: () => String }) name: string,
    @Args({ name: 'email', type: () => String }) email: string,
  ): Promise<Author> { 
    const newAuthor = this.authorService.create({ name, email });
    return this.authorService.create({ name, email })
    .then((author) => {
      pubSub.publish('authorAdded', { authorAdded: newAuthor }); 
      return author;
    });
  }

  @ResolveField((returns) => [Band], { name: 'bands' } as any)
  async bands(@Parent() author: Author) {
    return this.bandRepository.find({
      where: {
        author: author,
      },
    });
  }

  @Subscription(returns => Author, {
    name: 'authorAdded',
    defaultValue: null,
    nullable: true,
  })
  async authorAdded() {
    const called = true;
    return pubSub.asyncIterator('authorAdded');
  }
}
