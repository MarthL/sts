import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Users } from '../users/users.entity';
import { MaxLength } from 'class-validator';

@Entity()
export class Citys {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  @MaxLength(50)
  city_name: string;

  @Column('varchar', { length: 5 })
  @MaxLength(5)
  zip_code: string;

  @Column('varchar', { length: 170 })
  @MaxLength(170)
  state: string;

  @OneToMany(() => Users, (user) => user.city)
  users: Users[];
}