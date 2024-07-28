import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/createJobDto.dto';

describe('JobController', () => {
  let controller: JobController;
  let service: JobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [
        {
          provide: JobService,
          useValue: {
            getAll: jest.fn(),
            getJobById: jest.fn(),
            createJob: jest.fn(),
            deleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<JobController>(JobController);
    service = module.get<JobService>(JobService);
  });

  it('JobController should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('JobService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all jobs', async () => {
    const result = [];
    jest.spyOn(service, 'getAll').mockResolvedValue(result);
    expect(await controller.getAll()).toBe(result);
    expect(service.getAll).toHaveBeenCalled();
  });

  it('should get job by id', async () => {
    let result;
    jest.spyOn(service, 'getJobById').mockResolvedValue(result);
    expect(await controller.getJobById(1)).toBe(result);
    expect(service.getJobById).toHaveBeenCalled();
    expect(service.getJobById).toHaveBeenCalledWith(1);
  });

  it('should create a job', async () => {
    const job: CreateJobDto = { job_title: 'job', job_field: 1 };
    jest.spyOn(service, 'createJob').mockResolvedValue(job);
    const result = await controller.postJob(job);
    expect(result).toEqual({ newJob: job });
    expect(service.createJob).toHaveBeenCalled();
    expect(service.createJob).toHaveBeenCalledWith(job);
  });

  it('should delete a job', async () => {
    const result = {};
    jest.spyOn(service, 'deleteById').mockResolvedValue(result);
    expect(await controller.deleteJob(1)).toBe(result);
    expect(service.deleteById).toHaveBeenCalled();
    expect(service.deleteById).toHaveBeenCalledWith(1);
  });
});
