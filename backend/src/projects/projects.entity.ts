import { Clients } from '../clients/clients.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project_name: string;

  @Column('text')
  description: string;

  @OneToMany(() => Clients, (client) => client.projects)
  client?: Clients;
}