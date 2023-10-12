import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  project_name!: string;

  @Column()
  description!: string;
}
