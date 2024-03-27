import { IsInt, IsString } from "class-validator";
import { Projects } from "src/projects/projects.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Status {
    @PrimaryGeneratedColumn()
    @IsInt()
    id: number;

    @Column('varchar')
    @IsString()
    statusName: string;

    @OneToMany(() => Projects, (project) => project.status)
    @IsString()
    projects: string;
}