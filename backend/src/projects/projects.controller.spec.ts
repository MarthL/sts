import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from './projects.entity';

describe('ProjectsController', () => {
  let projectsController: ProjectsController;
  let projectsService: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Projects),
          useClass: Repository,
        },
      ],
    }).compile();

    projectsService = module.get<ProjectsService>(ProjectsService);
    projectsController = module.get<ProjectsController>(ProjectsController);
  });

  describe('findAll', () => {
    it('should return an array of projects', async () => {
      const result: Projects[] = Array.from({ length: 5 }, (_, index) => ({
        id: index + 1,
        project_name: `Project ${index + 1}`,
        description: `Description ${index + 1}`,
      }));

      jest.spyOn(projectsService, 'getProjects').mockResolvedValue(result);

      await expect(projectsController.getAll()).resolves.toEqual(result);
    });
  });
});
