import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Band {
    @Field(type => Int)
    id: number;

    @Field({nullable: false})
    name: string;

}