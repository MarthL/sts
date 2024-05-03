import { MaxLength } from 'class-validator';
import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Companys } from '../companys/company.entity';
import { Status } from 'src/status/status.entity';
import { Users } from 'src/users/users.entity';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  @MaxLength(50)
  project_name: string;

  @Column('text')
  description: string;

  @Column({ name: 'company_id', nullable: true })
  companyId: number;

  @ManyToOne(() => Companys, (company) => company.projects)
  @JoinColumn({ name: 'company_id' })
  company?: Companys;

  @ManyToOne(() => Status)
  status?: Status;

  @ManyToOne(() => Users)
  collaborators: Users[];
}
