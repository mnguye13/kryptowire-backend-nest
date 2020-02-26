import { InputType, Field, Int } from 'type-graphql';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

@InputType()
export class ModelInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly label: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly year: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly brandName: string;

  @Field(() => Int)
  readonly price: number;
}
