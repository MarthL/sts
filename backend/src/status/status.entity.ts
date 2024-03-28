import { IsInt, IsString } from "class-validator";
import { Projects } from "src/projects/projects.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    @IsInt()
    id: number;

    @Column('varchar', { length: 10 })
    @IsString()
    statusName: string;

    @OneToMany(() => Projects, (projects) => projects.status)
    @IsString()
    projects: string;
}