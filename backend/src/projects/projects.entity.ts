import { MaxLength } from 'class-validator';
import {
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Companys } from '../companys/company.entity';
import { Status } from '../status/status.entity';
import { Users } from '../users/users.entity';

@Entity({ name: 'projects' })
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  @MaxLength(50)
  project_name: string;

  @Column('text')
  description: string;

  @Column({ type: 'int', default: 0 })
  progress: number;

  @Column({ name: 'startDate', nullable: true })
  startDate: Date;

  @Column({ name: 'endDate', nullable: true })
  endDate: Date;

  @Column({ type: 'float', default: 0 })
  budget?: number;

  @Column({ name: 'company_id', nullable: true })
  companyId: number;

  @ManyToMany(() => Users)
  @JoinTable()
  collaborators: Users[];

  @ManyToOne(() => Companys, (company) => company.projects)
  @JoinColumn({ name: 'company_id' })
  company?: Companys;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status_id' })
  status?: Status;

  @Column({ nullable: true, default: null })
  photo_url: string;
}
