import { Citys } from 'src/citys/citys.entity';
import { Projects } from '../projects/projects.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @Column('varchar')
  zip_code?: string;

  @Column('varchar')
  state?: string;

  @Column('varchar')
  city?: Citys;

  @OneToMany(() => Projects, (projects) => projects.client)
  projects?: Projects[];
>>>>>>> e532615818865792d86e1f360653afa343423383
}