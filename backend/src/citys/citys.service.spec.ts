import { Test, TestingModule } from '@nestjs/testing';
import { CitysService } from './citys.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Citys } from './citys.entity';
import { Like } from 'typeorm';

describe('CitysService', () => {
  let service: CitysService;
  let repository: Repository<Citys>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitysService,
        {
          provide: getRepositoryToken(Citys),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<CitysService>(CitysService);
    repository = module.get<Repository<Citys>>(getRepositoryToken(Citys));
  });

  it('should call getCitys with correct parameters', async () => {
    const search = 'test';
    await service.getCitys(search);
    expect(repository.find).toHaveBeenCalledWith({
      take: 10,
      where: {
        city_name: Like(`${search}%`),
      },
    });
  });

  it('should call getCityById with correct parameters', async () => {
    const id = 1;
    await service.getCityById(id);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id },
    });
  });

  it('should call patch with correct parameters', async () => {
    const id = 1;
    const updateReq = { name: 'test' } as any;
    await service.patch(id, updateReq);
    expect(repository.update).toHaveBeenCalledWith(id, updateReq);
  });
});
