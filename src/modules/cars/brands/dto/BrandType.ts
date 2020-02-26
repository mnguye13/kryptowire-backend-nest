/*export class CreateBrandDto {
  name: string;
  origin: string;
}
*/
import { ObjectType, Field, Int, ID } from 'type-graphql';
import { ModelType } from '../../models/dto/ModelType';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

@ObjectType()
export class BrandType {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly origin: string;

  @Field(() => [ModelType])
  models: ModelType[];
}
