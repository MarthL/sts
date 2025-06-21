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
import { MaxLength } from 'class-validator';
import { UserProject } from 'src/user-project/user-project.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  @MaxLength(50)
  username: string;

  @Column('varchar', { length: 72 })
  @MaxLength(72)
  password: string;

  @Column('varchar', { nullable: true, default: null, length: 100 })
  @MaxLength(100)
  family_name: string;

  @Column('int', { nullable: true, default: null })
  yop: number;

  @Column('varchar', { nullable: true, default: '' })
  @MaxLength(15)
  phone_number: string;

  @Column('varchar', { nullable: true, default: null, length: 200 })
  @MaxLength(200)
  email: string;

  @Column('varchar', { nullable: true, default: null, length: 255 })
  @MaxLength(255)
  address: string;

  @OneToMany(() => UserProject, (userProject) => userProject.user)
  userProjects: UserProject[];

  @ManyToOne(() => Job, (job) => job.users)
  @JoinColumn({ name: 'job_id' })
  job?: Job;

  @ManyToOne(() => Companys, (company) => company.users)
  @JoinColumn({ name: 'company_id' })
  company?: Companys;

  @ManyToOne(() => Citys, (city) => city.users, { nullable: true })
  @JoinColumn({ name: 'city_id' })
  city?: Citys;

  @Column({ nullable: true, default: null })
  profile_picture?: string;
}
