import { IsInt, IsString } from 'class-validator';
import { Status } from 'src/status/status.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column('varchar')
  @IsString()
  project_name: string;

  @Column('text')
  @IsString()
  description: string;

  @ManyToOne(() => Status, (status) => status.projects_id)
  @JoinColumn({ name: 'status_id' })
  @IsInt()
  status_id: number;
}