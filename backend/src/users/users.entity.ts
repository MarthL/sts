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
import { Citys } from 'src/citys/citys.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  username: string;

  @Column('varchar')
  password: string;

  @Column('varchar', { nullable: true, default: null })
  family_name: string;

  @Column('int', { nullable: true, default: null })
  yop: number;

  @Column('varchar', { nullable: true, default: null })
  phone_number: string;

  @Column('varchar', { nullable: true, default: null })
  email: string;

  @Column({ nullable: true, default: null })
  address: string;

  // @Column({ nullable: true, default: null })
  // state?: number;

  // @Column({ nullable: true, default: null })
  // zip_code?: number;

  // @Column({ nullable: true, default: null })
  // country?: string;

  @ManyToOne(() => Job, (job) => job.users)
  @JoinColumn({ name: 'job_id' })
  job?: Job;

  @ManyToMany(() => Projects)
  @JoinTable()
  projectsCollection: Projects[];

  @ManyToOne(() => Citys)
  @JoinColumn({ name: 'city_id' })
  city: Citys[];
}
