import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Citys {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  city_name: string;

  @Column('varchar')
  zip_code: string;

  @Column('varchar')
  state: string;
}
