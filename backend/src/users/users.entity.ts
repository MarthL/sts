import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Job } from 'src/job/job.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  username: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  family_name: string;

  @Column('int')
  yop: number;

  @ManyToOne(() => Job, (job) => job.users)
  job: Job;
}
