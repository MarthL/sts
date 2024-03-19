import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 14 })
  siret: string;

  @Column('varchar', { length: 50 })
  industry: string;

  @Column('varchar', { length: 200 })
  mail: string;

  @Column('varchar', { length: 12 })
  phone: string;

  @Column('varchar', { length: 255 })
  adress: string;

  @Column('varchar', { length: 5 })
  zip_code: string;

  @Column('varchar', { length: 170 })
  state: string;

  @Column('varchar', { length: 50 })
  city: string;
}