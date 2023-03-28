import { Field, Int, ObjectType } from '@nestjs/graphql';
import {Band} from './band.model'

@ObjectType()
export class Author {
    @Field(type => Int, {nullable:false})
    id: number;

    @Field({nullable:false})
    email: string;

    @Field({nullable:true})
    name: string;

    @Field(type=>[Band])
    bands: Band[];
}