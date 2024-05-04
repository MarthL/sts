import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanysService } from './company.service';
import { Status } from '../status/status.entity';

describe('Company Controller', () => {
  let controller: CompanyController;
  let service: CompanysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanysService,
          useValue: {
            getAllCompanys: jest.fn(),
            getCompanyById: jest.fn(),
            deleteById: jest.fn(),
            post: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    service = module.get<CompanysService>(CompanysService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
