// user-project.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';
import { Projects } from '../projects/projects.entity';

@Entity('user_project')
export class UserProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', default: 1 }) // exemple : 0.5 = 50%
  occupation_rate: number;

  @ManyToOne(() => Users, (user) => user.userProjects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Projects, (project) => project.userProjects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Projects;
}
