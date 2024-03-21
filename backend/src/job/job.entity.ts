import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Users } from '../users/users.entity';
import { JobField } from '../job-field/job-field.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  job_title: string;

  @OneToMany(() => Users, (user) => user.job)
  users: Users[];

  @ManyToOne(() => JobField, (jobfield) => jobfield.Job)
  jobField: JobField;
}