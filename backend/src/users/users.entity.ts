import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';

import { Job } from 'src/job/job.entity';
import { Projects } from 'src/projects/projects.entity';

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

  @ManyToMany(() => Projects)
  @JoinTable()
  projectsCollection: Projects[];
}
