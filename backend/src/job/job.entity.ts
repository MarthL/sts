import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from 'src/users/users.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  job_title: string;

  @OneToMany(() => Users, (user) => user.job)
  users: Users[];
}
