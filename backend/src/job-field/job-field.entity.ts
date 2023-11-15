import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Job } from 'src/job/job.entity';
@Entity()
export class JobField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Job, (job) => job.jobField)
  Job: JobField[];
}
