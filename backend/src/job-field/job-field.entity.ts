import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Job } from '../job/job.entity';
import { MaxLength } from 'class-validator';

@Entity()
export class JobField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  @MaxLength(100)
  name: string;

  @OneToMany(() => Job, (job) => job.jobField, { cascade: true })
  Job: JobField[];
}
