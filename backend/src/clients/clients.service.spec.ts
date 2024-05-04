import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Clients } from './clients.entity';
import { Repository, DeleteResult } from 'typeorm';

describe('ClientsService', () => {
  let service: ClientsService;
  let mockRepository: MockType<Repository<Clients>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(Clients),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            save: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({} as DeleteResult),
          },
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    mockRepository = module.get(getRepositoryToken(Clients));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getClients should return an array of clients', async () => {
    const result = await service.getClients();
    expect(result).toEqual([]);
    expect(mockRepository.find).toBeCalled();
  });

  it('post should save and return a client', async () => {
    const dto = { name: 'Test' } as any;
    const result = await service.post(dto);
    expect(result).toEqual({});
    expect(mockRepository.save).toBeCalledWith(dto);
  });

  it('deleteById should delete and return a result', async () => {
    const id = 1;
    const result = await service.deleteById(id);
    expect(result).toEqual({});
    expect(mockRepository.delete).toBeCalledWith(id);
  });
});

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any, any>;
};
