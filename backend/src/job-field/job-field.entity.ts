import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Job } from '../job/job.entity';

@Entity()
export class JobField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @OneToMany(() => Job, (job) => job.jobField)
  Job: JobField[];
}