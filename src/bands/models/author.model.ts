import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Band } from './band.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Author {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int, { nullable: false })
  id: number;

  @Column({ nullable: false })
  @Field({ nullable: false })
  email: string;

  @Column()
  @Field({ nullable: true })
  name: string;

  @Field(() => [Band])
  @OneToMany(() => Band, (band) => band.author)
  bands: Band[];
}
