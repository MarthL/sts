import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

describe('Status Controller', () => {
  let controller: StatusController;
  let service: StatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [
        {
          provide: StatusService,
          useValue: {
            getAll: jest.fn(),
            getStatusById: jest.fn(),
            createStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StatusController>(StatusController);
    service = module.get<StatusService>(StatusService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all statuses', async () => {
    const result = [];
    jest.spyOn(service, 'getAll').mockResolvedValue(result);
    expect(await controller.getAll()).toBe(result);
    expect(service.getAll).toHaveBeenCalled();
  });

  it('should get status by id', async () => {
    let result;
    jest.spyOn(service, 'getStatusById').mockResolvedValue(result);
    expect(await controller.getStatusById(1)).toBe(result);
    expect(service.getStatusById).toHaveBeenCalled();
    expect(service.getStatusById).toHaveBeenCalledWith(1);
  });

  it('should create a status', async () => {
    const status = { name: 'status' };
    jest.spyOn(service, 'createStatus').mockResolvedValue(status);
    expect(await controller.create(status)).toBe(status);
    expect(service.createStatus).toHaveBeenCalled();
    expect(service.createStatus).toHaveBeenCalledWith(status);
  });
});
