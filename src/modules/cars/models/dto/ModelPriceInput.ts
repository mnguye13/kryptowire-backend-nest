import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class ModelPriceInput {
  @Field()
  readonly label: string;
  @Field(() => Int)
  readonly price: number;
}
