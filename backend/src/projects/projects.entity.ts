import { Clients } from '../clients/clients.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  project_name: string;

  @Column('text')
  description: string;
<<<<<<< HEAD
=======

  @ManyToOne(() => Clients, (client) => client.projects)
  @JoinColumn({ name: 'client_id' })
  client?: Clients;
>>>>>>> e532615818865792d86e1f360653afa343423383
}