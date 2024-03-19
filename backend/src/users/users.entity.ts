import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Job } from '../job/job.entity';
import { Projects } from '../projects/projects.entity';
import { Companys } from '../companys/company.entity';
import { Citys } from '../citys/citys.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  username: string;

  @Column('varchar', { length: 72 })
  password: string;

  @Column('varchar', { nullable: true, default: null, length: 100 })
  family_name: string;

  @Column('int', { nullable: true, default: null, width: 2 })
  yop: number;

  @Column('varchar', { nullable: true, default: '', length: 12 })
  phone_number: string;

  @Column('varchar', { nullable: true, default: null, length: 200 })
  email: string;

  @Column('varchar', { nullable: true, default: null, length: 255 })
  address: string;

  @ManyToOne(() => Job, (job) => job.users)
  @JoinColumn({ name: 'job_id' })
  job?: Job;

  @ManyToMany(() => Projects)
  @JoinTable()
  projectsCollection: Projects[];

  @ManyToOne(() => Companys, (company) => company.users)
  @JoinColumn({ name: 'company_id' })
  company?: Companys;

  @ManyToOne(() => Citys, (city) => city.users)
  @JoinColumn({ name: 'city_id' })
  city: Citys;
}