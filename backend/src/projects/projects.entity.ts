import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100})
  project_name: string;

  @Column('text')
  description: string;
}