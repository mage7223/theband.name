import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Author } from '../models/author.model';
import { AuthorService } from '../service/author.service';
import { BaseEntity } from 'typeorm';

@Resolver((of: any) => Author)
export class AuthorResolver extends BaseEntity {
  constructor(private authorService: AuthorService) {
    super();
  }

  @Query((returns) => Author, { name: 'author' })
  async getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.authorService.findOne({ where: { id } });
  }

  @Query((returns) => [Author])
  async getUsers() {
    return this.authorService.findAll();
  }

  @Mutation((returns) => Author)
  createBand(
    @Args({ name: 'name', type: () => String }) name: string,
    @Args({ name: 'email', type: () => String }) email: string,
  ) {
    return this.authorService.create({ name, email });
  }
}
