/*
export class CreateModelDto {
  label: string;
  year: string;
  price: number;
  brandName: string;
}
*/
import { ObjectType, Field, Int, ID } from 'type-graphql';
import { BrandType } from '../../brands/dto/BrandType';
import { IsString, IsNotEmpty, IsNumber, IsInt } from 'class-validator';
@ObjectType()
export class ModelType {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly label: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly year: string;

  @Field(() => Int)
  readonly price: number;

  @Field(type => BrandType)
  readonly brand: BrandType;
}
