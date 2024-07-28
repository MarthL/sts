import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { JobField } from './../job-field/job-field.entity';
import { JobResponseDto } from './dto/jobResponseDto.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

jest.mock('typeorm', () => ({
  ...jest.requireActual('typeorm'),
  ManyToOne: jest.fn((callback) => callback()),
}));

describe('jobEntity', () => {
  let jobRepository: Repository<Job>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Job),
          useClass: Repository,
        },
      ],
    }).compile();

    jobRepository = module.get<Repository<Job>>(getRepositoryToken(Job));
  });

  it('should define job', async () => {
    const job = new Job();
    expect(job).toBeDefined();
  });

  it('Validating all property', async () => {
    const job = new Job();
    job.id = 1;
    job.job_title = 'This is a test for job title = fullstack';
    const checkDto = plainToClass(JobResponseDto, job);
    const errors = validate(checkDto);
    expect((await errors).length).toBe(0);
  });

  it('should display an error when do not have any id', async () => {
    const job = new Job();
    job.job_title = 'This is a test for job title = fullstack';
    const checkDto = plainToClass(JobResponseDto, job);
    const errors = validate(checkDto);
    expect((await errors).length).toBeGreaterThan(0);
  });

  it('should display an error when do not have any job title', async () => {
    const job = new Job();
    job.id = 1;
    const checkDto = plainToClass(JobResponseDto, job);
    const errors = validate(checkDto);
    expect((await errors).length).toBeGreaterThan(0);
  });

  it('should access jobField property', async () => {
    const job = new Job();
    job.id = 1;
    job.job_title = 'This is a test for job title = fullstack';
    const jobField = new JobField();
    jobField.id = 1;
    job.jobField = jobField;
    await jobRepository.save(job);
    expect(job.jobField).toBeInstanceOf(JobField);
  });
});
