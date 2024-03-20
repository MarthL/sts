import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Links {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  url: string;

  @OneToMany(() => Users, (user) => user.link)
  users: Users[];
}
