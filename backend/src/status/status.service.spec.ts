import { Test, TestingModule } from '@nestjs/testing';
import { StatusService } from './status.service';

describe('StatusService', () => {
  let service: StatusService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
