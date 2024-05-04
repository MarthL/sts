import { Test, TestingModule } from '@nestjs/testing';
import { StatusService } from './status.service';
import { Repository } from 'typeorm';
import { Status } from './status.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('StatusService', () => {
  let service: StatusService;
  let repository: Repository<Status>;

  const repositoryMock = {
    findOne: jest.fn().mockImplementation(() =>
      Promise.resolve({
        id: 1,
        name: 'not contacted yet',
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatusService,
        {
          provide: 'StatusRepository',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<StatusService>(StatusService);
    repository = module.get<Repository<Status>>(getRepositoryToken(Status));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call getAll with correct parameters', async () => {
    await service.getAll();
    expect(repository.find).toHaveBeenCalled();
  });

  it('should call getStatusById with correct parameters', async () => {
    const id = 1;
    await service.getStatusById(id);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id },
    });
  });

  it('should call createStatus with correct parameters', async () => {
    const statusDto = { status: 'test' } as any;
    await service.createStatus(statusDto);
    expect(repository.save).toHaveBeenCalled();
  });
});
