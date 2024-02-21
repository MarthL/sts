/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { validate } from 'class-validator';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { Job } from '../job/job.entity';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from '../DTO/User/userResponseDto.dto';

describe('userEntity', () => {
  let userRepository: Repository<Users>;
  let jobRepository: Repository<Job>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Users),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Job),
          useClass: Repository,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    jobRepository = module.get<Repository<Job>>(getRepositoryToken(Job));
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should define user', async () => {
    const user = new Users();
    expect(user).toBeDefined();

    console.log('userRepoosit : ', module);
    const errors = validate(user);
    expect((await errors).length).toBe(0);
  });

  it('should display an error when do not have any id', async () => {
    const user = new Users();
    user.id = null;
    user.username = 'username';
    user.email = 'test@gmail.com';
    const checkDto = plainToClass(UserResponseDto, user);
    const errors = validate(checkDto);
    expect((await errors).length).toBeGreaterThan(0);
  });

  it('Creating a user with Id', async () => {
    const user = new Users();
    user.password = 'tp';
    user.id = 1;
    user.username = 'test';
    user.phone_number = '';
    console.log(user);
    const checkDto = plainToClass(UserResponseDto, user);
    const errors = validate(checkDto);
    console.log(await errors);
    expect((await errors).length).toBe(0);
  });

  // to continue
  it('Should validate and create a user with a job', async () => {
    const user = new Users();
    const newJob = new Job();
    newJob.id = 1;
    newJob.job_title = 'random job';
    user.id = 1;
    user.job = newJob;
    const errors = validate(user);
    expect(user).toContain(Job);
    expect((await errors).length).toBe(0);
  });
});
