import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinTable,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { ObjectType, Field, Int, ID } from 'type-graphql';
import { IsString, IsNotEmpty, IsNumber, IsInt } from 'class-validator';
import { Model } from '../models/models.entity';
@Entity()
@ObjectType()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  origin: string;

  @OneToMany(
    type => Model,
    model => model.brand,
  )
  @Field(() => [Model])
  models?: Model[];
}
