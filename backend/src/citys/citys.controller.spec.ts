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
});
