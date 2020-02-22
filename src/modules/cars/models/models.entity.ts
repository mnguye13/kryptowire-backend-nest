import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  year: string;

  @Column()
  price: number;

  @Column()
  brandName: string;
}
