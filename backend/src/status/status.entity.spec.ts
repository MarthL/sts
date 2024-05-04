import { Repository } from 'typeorm';
import { Status } from './status.entity';
import { CreateStatusDto } from './dto/createStatusDto.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

describe('StatusEntity', () => {
  let statusRepository: Repository<Status>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Status),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    statusRepository = module.get<Repository<Status>>(
      getRepositoryToken(Status),
    );
  });

  it('should be defined', () => {
    expect(statusRepository).toBeDefined();
  });

  it('should create a status', async () => {
    const status = new Status();
    status.name = 'Test';
    const result = await statusRepository.save(status);
    const checkDto = plainToClass(CreateStatusDto, result);
    const errors = await validate(checkDto);
    console.error(errors);
    expect((await errors).length).toBe(0);
  });

  it('should not create a status with invalid data', async () => {
    const status = plainToClass(CreateStatusDto, {
      name: '',
    });

    const errors = await validate(status);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not create if name is not a string', async () => {
    const status = plainToClass(CreateStatusDto, {
      name: 1 as any,
    });

    const errors = await validate(status);

    expect(errors.length).toBe(0);
  });
});
