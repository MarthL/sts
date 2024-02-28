import { Repository } from "typeorm";
import { Projects } from "./projects.entity";
import  ProjectsResponseDto  from "../DTO/Projects/projectsResponse.dto";
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

describe('projectEntity', () => {
    let projectRepository: Repository<Projects>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(Projects),
                    useClass: Repository,
                },
            ],
        }).compile();

        projectRepository = module.get<Repository<Projects>>(getRepositoryToken(Projects));
    });

    it('should define project', async () => {
        const project = new Projects();
        expect(project).toBeDefined();
    });

    it('Validating all property', async () => {
        const project = new Projects();
        project.id = 1;
        project.project_name = 'This is a project name test';
        project.description = 'This a description test';
        const checkDto = plainToClass(ProjectsResponseDto, project);
        const errors = validate(checkDto);
        expect((await errors).length).toBe(0);
    });

    it('should display an error when do not have any id', async () => {
        const project = new Projects();
        project.project_name = 'This is a project name test';
        project.description = 'This a description test';
        const checkDto = plainToClass(ProjectsResponseDto, project);
        const errors = validate(checkDto);
        expect((await errors).length).toBeGreaterThan(0);
    });

    it('should display an error when do not have any project name', async () => {
        const project = new Projects();
        project.id = 1;
        project.description = 'This a description test';
        const checkDto = plainToClass(ProjectsResponseDto, project);
        const errors = validate(checkDto);
        expect((await errors).length).toBeGreaterThan(0);
    });

    it('should display an error when do not have any description', async () => {
        const project = new Projects();
        project.id = 1;
        project.project_name = 'This is a project name test';
        const checkDto = plainToClass(ProjectsResponseDto, project);
        const errors = validate(checkDto);
        expect((await errors).length).toBeGreaterThan(0);
    });
})