import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';

describe('Project Controller', () => {
  let controller: ProjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
