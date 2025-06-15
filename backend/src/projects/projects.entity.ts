import { MaxLength } from 'class-validator';
import {
  Entity,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Companys } from '../companys/company.entity';
import { Status } from '../status/status.entity';
import { Users } from '../users/users.entity';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  @MaxLength(50)
  project_name: string;

  @Column('text')
  description: string;

  @Column('float')
  progress: number;

  @Column({ name: 'date', nullable: true })
  startDate: Date;

  @Column({ name: 'date', nullable: true })
  endtDate: Date;

  @Column('float')
  budget?: number;

  @Column({ name: 'company_id', nullable: true })
  companyId: number;

  @ManyToMany(() => Users, (member) => member.username)
  @JoinColumn({ name: 'username' })
  member: Users;

  @ManyToOne(() => Companys, (company) => company.projects)
  @JoinColumn({ name: 'company_id' })
  company?: Companys;

  @ManyToOne(() => Status)
  status?: Status;

  @ManyToOne(() => Users)
  collaborators: Users[];

  @Column({ nullable: true, default: null })
  photo_url: string;
}
