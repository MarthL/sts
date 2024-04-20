import { MaxLength } from 'class-validator';
import { Citys } from 'src/citys/citys.entity';
import { Projects } from '../projects/projects.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  @MaxLength(100)
  name!: string;

  @Column('varchar', { length: 14 })
  @MaxLength(14)
  siret!: string;

  @Column('varchar', { length: 50 })
  @MaxLength(50)
  industry?: string;

  @Column('varchar', { length: 200 })
  @MaxLength(200)
  mail!: string;

  @Column('varchar', { length: 12 })
  @MaxLength(12)
  phone!: string;

  @Column('varchar', { length: 255 })
  @MaxLength(255)
  address?: string;

  @ManyToOne(() => Citys, (citys) => citys)
  @JoinColumn({ name: 'city_id' })
  @MaxLength(5)
  city_id?: number;

  @Column('varchar', { length: 170 })
  @MaxLength(170)
  state: string;

  @ManyToOne(() => Projects, (projects) => projects.client)
  @JoinColumn({ name: 'project_id' })
  projects_id?: number;
}