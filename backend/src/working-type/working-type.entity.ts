import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Users } from '../users/users.entity';
import { MaxLength } from 'class-validator';

@Entity()
export class WorkingType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  @MaxLength(100)
  contract_type: string;

  @OneToMany(() => Users, (user) => user.job)
  users: Users[];
}
