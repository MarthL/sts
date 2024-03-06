import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Job } from '../job/job.entity';
import { Projects } from '../projects/projects.entity';
import { Companys } from '../companys/company.entity';
import { Citys } from '../citys/citys.entity';
import { Links } from 'src/links/links.entity';

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

  @Column('varchar', { nullable: true, default: '' })
  phone_number: string;

  @Column('varchar', { nullable: true, default: null })
  email: string;

  @Column('varchar', { nullable: true, default: null })
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

  @OneToMany(() => Links, (link) => link.users)
  @JoinColumn({ name: 'link_id' })
  link?: Links;
}