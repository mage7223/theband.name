import { Injectable } from '@nestjs/common';
import { Author } from '../models/author.model';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  findAll() {
    this.authorRepository.find();
  }

  findOne(id: FindOneOptions<Author>): Promise<Author | null> {
    return this.authorRepository.findOne(id);
  }

  findAny(filter: FindOneOptions<Author>): Promise<Author[] | null> {
    return this.authorRepository.find(filter);
  }

  create(arg0: { name: string; email: string }) {
    const author = new Author();
    author.name = arg0.name;
    author.email = arg0.email;

    return this.authorRepository.save(author);
  }
}
