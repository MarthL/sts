import { Citys } from 'src/citys/citys.entity';
import { Projects } from '../projects/projects.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

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
  adress?: string;

  @ManyToOne(() => Citys, (citys) => citys.id)
  city_id?: Citys[];

  @OneToMany(() => Projects, (projects) => projects.client)
  projects?: Projects[];
}