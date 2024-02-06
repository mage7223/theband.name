import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from './author.model';

@ObjectType()
@Entity()
export class Band extends BaseEntity {
  constructor(name?: string, author?: Author | string) {
    super();
    this.name = name ?? '';
    if (typeof author === 'string') {
      this.author = new Author(author);
    }
    if (author instanceof Author) {
      this.author = author;
    }
  }

  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  @ManyToOne(() => Author, (author) => author.bands)
  author: Author;
}
