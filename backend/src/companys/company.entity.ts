import { MaxLength } from 'class-validator';
import { Users } from '../users/users.entity';
import { Projects } from '../projects/projects.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Companys {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  @MaxLength(100)
  name: string;

  @OneToMany(() => Users, (user) => user.company)
  users: Users[];

  @OneToMany(() => Projects, (project) => project.company, { cascade: true })
  projects: Projects[];
}
