import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Band } from './band.model';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Author extends BaseEntity {
  constructor(email?: string, name?: string) {
    super();
    this.email = email ?? '';
    this.name = name ?? '';
  }

  @PrimaryGeneratedColumn('increment')
  @Field((type) => Int, { nullable: false })
  id: number;

  @Column({ nullable: false })
  @Field({ nullable: false })
  email: string;

  @Column()
  @Field({ nullable: true })
  name: string;

  @Field(() => [Band])
  @OneToMany(() => Band, (band) => band.author, { cascade: true })
  bands: Band[];
}
