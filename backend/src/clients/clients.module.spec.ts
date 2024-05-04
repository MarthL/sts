import { Test, TestingModule } from '@nestjs/testing';
import { ClientsModule } from './clients.module';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Clients } from './clients.entity';

describe('ClientsModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ClientsModule],
    })
      .overrideProvider(getRepositoryToken(Clients))
      .useValue({
        find: jest.fn().mockResolvedValue([]),
        save: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue({}),
      })
      .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide the clients service', () => {
    const service = module.get<ClientsService>(ClientsService);
    expect(service).toBeDefined();
  });

  it('should provide the clients controller', () => {
    const controller = module.get<ClientsController>(ClientsController);
    expect(controller).toBeDefined();
  });
});
