import { MaxLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  @MaxLength(100)
  name: string;

  @Column('varchar', { length: 14 })
  @MaxLength(14)
  siret: string;

  @Column('varchar', { length: 50 })
  @MaxLength(50)
  industry: string;

  @Column('varchar', { length: 200 })
  @MaxLength(200)
  mail: string;

  @Column('varchar', { length: 12 })
  @MaxLength(12)
  phone: string;

  @Column('varchar', { length: 255 })
  @MaxLength(255)
  adress: string;

  @Column('varchar', { length: 5 })
  @MaxLength(5)
  zip_code: string;

  @Column('varchar', { length: 170 })
  @MaxLength(170)
  state: string;

  @Column('varchar', { length: 50 })
  @MaxLength(50)
  city: string;
}