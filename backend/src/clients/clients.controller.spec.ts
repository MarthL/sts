import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { DeleteResult } from 'typeorm';

describe('Clients Controller', () => {
  let controller: ClientsController;
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        {
          provide: ClientsService,
          useValue: {
            getClients: jest.fn(),
            post: jest.fn(),
            deleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    service = module.get<ClientsService>(ClientsService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all clients', async () => {
    const result = [];
    jest.spyOn(service, 'getClients').mockResolvedValue(result);
    expect(await controller.getAll()).toBe(result);
    expect(service.getClients).toHaveBeenCalled();
  });

  it('should delete a client', async () => {
    const id = 1;
    jest.spyOn(service, 'deleteById').mockResolvedValue(id as any);
    expect(await controller.deleteById(id)).toBe(id);
    expect(service.deleteById).toHaveBeenCalled();
    expect(service.deleteById).toHaveBeenCalledWith(id);
  });

  it('should create a client', async () => {
    const client = { name: 'client' } as any;
    jest.spyOn(service, 'post').mockResolvedValue(client);
    expect(await controller.create(client)).toBe(client);
    expect(service.post).toHaveBeenCalled();
    expect(service.post).toHaveBeenCalledWith(client);
  });
});
