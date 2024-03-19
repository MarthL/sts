import { MaxLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  @MaxLength(50)
  project_name: string;

  @Column('text')
  description: string;
}