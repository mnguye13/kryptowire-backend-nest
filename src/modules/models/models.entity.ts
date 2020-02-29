import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
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
  brandId: number;

  @ManyToOne(
    type => Brand,
    brand => brand.models,
    {
      cascade: true,
    },
  )
  @Field(type => Brand)
  brand?: Brand;
}
