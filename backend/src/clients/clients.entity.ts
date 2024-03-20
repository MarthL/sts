import { Citys } from 'src/citys/citys.entity';
import { Projects } from '../projects/projects.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name!: string;

  @Column('varchar')
  siret!: string;

  @Column('varchar')
  industry?: string;

  @Column('varchar')
  mail!: string;

  @Column('varchar')
  phone!: string;

  @Column('varchar')
  address?: string;

  @ManyToOne(() => Citys, (citys) => citys)
  @JoinColumn({ name: 'city_id' })
  city?: Citys[];

  @ManyToOne(() => Projects, (projects) => projects.client)
  @JoinColumn({ name: 'project_id' })
  projects?: Projects[];
}