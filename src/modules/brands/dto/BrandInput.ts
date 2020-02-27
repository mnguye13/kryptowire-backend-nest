import { InputType, Field, Int } from 'type-graphql';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class BrandInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly origin: string;
}
