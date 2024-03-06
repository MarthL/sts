import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Users } from '../users/users.entity';

@Entity()
export class Links {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(() => Users, (user) => user.link)
    users: Users[];
}