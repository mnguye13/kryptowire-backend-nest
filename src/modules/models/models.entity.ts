import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ObjectType, Field, Int, ID } from 'type-graphql';
import { IsString, IsNotEmpty, IsNumber, IsInt } from 'class-validator';
import { Brand } from '../brands/brands.entity';
@Entity()
@ObjectType()
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  label: string;

  @Column()
  @Field()
  year: string;

  @Column()
  @Field()
  price: number;

  @Column()
  @Field()
  brandName: string;

  @OneToOne(
    type => Brand,
    brand => brand.models,
  )
  @Field(type => Brand)
  brand?: Brand;
}
