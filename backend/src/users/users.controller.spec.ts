import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProjectsService } from './../projects/projects.service';

describe('Users Controller', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            getUserProjects: jest.fn(),
            deleteById: jest.fn(),
            checkUserExist: jest.fn(),
            getLoggedUser: jest.fn(),
            createUser: jest.fn(),
            patch: jest.fn(),
            updateProfilePicture: jest.fn(),
          },
        },
        {
          provide: ProjectsService,
          useValue: {
            getProjects: jest.fn(),
            getProjectById: jest.fn(),
            post: jest.fn(),
            deleteById: jest.fn(),
            patch: jest.fn(),
            updateProjectPicture: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
