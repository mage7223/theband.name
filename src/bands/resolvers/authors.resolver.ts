/* eslint-disable prettier/prettier */
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Author } from '../models/author.model';
import { AuthorService } from '../service/author.service';
import { BaseEntity, Repository } from 'typeorm';
import { Filter, FilterArgs } from 'nestjs-graphql-tools';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver((of: any) => Author)
export class AuthorResolver extends BaseEntity {
  constructor(private authorService: AuthorService,
    @InjectRepository(Author) private authorRepository: Repository<Author>){
    super();
  }

  @Query((returns) => Author, { name: 'author' })
  async getAuthorById(@Args('id', { type: () => Int }) id: number) {
    //return this.authorService.findOne({ where: { id } });
    // or return Author.findOne({ where: { id } });
    return Author.createQueryBuilder()
      .where('author.id = :id', { id })
      .getOne();
  }

  @Query((returns) => [Author])
  async getAuthors() {
    return this.authorService.findAll();
    // return Author.find();
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
}
