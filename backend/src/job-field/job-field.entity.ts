import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JobField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
