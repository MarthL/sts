import { Test, TestingModule } from '@nestjs/testing';
import { CitysController } from './citys.controller';
import { CitysService } from './citys.service';

describe('Citys Controller', () => {
  let controller: CitysController;
  let service: CitysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitysController],
      providers: [
        {
          provide: CitysService,
          useValue: {
            getCitys: jest.fn(),
            getCityById: jest.fn(),
            patch: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CitysController>(CitysController);
    service = module.get<CitysService>(CitysService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getCitys with correct parameters', async () => {
    const search = 'test';
    await controller.getAll(search);
    expect(service.getCitys).toHaveBeenCalledWith(search);
  });

  it('should call getCityById with correct parameters', async () => {
    const id = 1;
    await controller.getCityById(id);
    expect(service.getCityById).toHaveBeenCalledWith(id);
  });

  it('should call patch with correct parameters', async () => {
    const id = 1;
    const updateReq = { name: 'test' } as any;
    await controller.updateCities(id, updateReq);
    expect(service.patch).toHaveBeenCalledWith(id, updateReq);
  });
});
