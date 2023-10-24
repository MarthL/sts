import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
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

  @Column('varchar')
  phone_number: string;

  @Column('varchar')
  email: string;

  @ManyToOne(() => Job, (job) => job.users)
  @JoinColumn({ name: 'job_id' })
  job?: Job;

  @ManyToMany(() => Projects)
  @JoinTable()
  projectsCollection: Projects[];
}
