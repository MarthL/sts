import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from '../users/users.entity';

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

  @OneToMany(() => Users, (user) => user.city)
  users: Users[];
}
