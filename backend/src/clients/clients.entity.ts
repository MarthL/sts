import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  siret: string;

  @Column('varchar')
  industry: string;

  @Column('varchar')
  mail: string;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  adress: string;

  @Column('varchar')
  zip_code: string;

  @Column('varchar')
  state: string;

  @Column('varchar')
  city: string;
}