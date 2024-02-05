import { Field, InputType } from '@nestjs/graphql';

@InputType()
/**
 * Represents the data required to create a band.
 */
export class CreateBandType {

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  authorEmail: string;
}
