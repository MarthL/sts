import { Test, TestingModule } from '@nestjs/testing';
import { validate } from 'class-validator';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { Job } from '../job/job.entity';
import { Projects } from '../projects/projects.entity';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from './dto/userResponseDto.dto';
import { Citys } from '../citys/citys.entity';
import { Companys } from '../companys/company.entity';

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

  it('should have correct relations', async () => {
    const user = new Users();
    const job = new Job();
    const project = new Projects();
    const company = new Companys();
    const city = new Citys();

    user.job = job;
    user.projectsCollection = [project];
    user.company = company;
    user.city = city;

    expect(user.job).toBe(job);
    expect(user.projectsCollection).toEqual([project]);
    expect(user.company).toBe(company);
    expect(user.city).toBe(city);
  });

  it('Validating id property', async () => {
    const user = new Users();
    user.password = 'tp';
    user.id = 1;
    user.username = 'test';
    user.phone_number = '';
    const checkDto = plainToClass(UserResponseDto, user);
    const errors = validate(checkDto);
    expect((await errors).length).toBe(0);
  });

  it('Should validate and create a user with a job', async () => {
    const newJob = new Job();
    newJob.id = 1;
    newJob.job_title = 'random job';

    const user = new Users();
    user.id = 1;
    user.username = 'johnDoe';
    user.password = 'tryit';
    user.job = newJob;

    const checkDto = plainToClass(UserResponseDto, user);
    const errors = await validate(checkDto);

    expect(errors.length).toBe(0);
    expect(checkDto.job_id).toBe(newJob.id);
  });

  it('Should validate and create a user with a company', async () => {
    const newCompany = new Companys();
    newCompany.id = 1;
    newCompany.name = 'random company';

    const user = new Users();
    user.id = 1;
    user.username = 'johnDoe';
    user.password = 'tryit';
    user.company = newCompany;

    const checkDto = plainToClass(UserResponseDto, user);
    const errors = await validate(checkDto);

    expect(errors.length).toBe(0);
    expect(checkDto.company_id).toBe(newCompany.id);
  });

  it('Should validate and create a user with a city', async () => {
    const newCity = new Citys();
    newCity.id = 1;
    newCity.city_name = 'random city';

    const user = new Users();
    user.id = 1;
    user.username = 'johnDoe';
    user.password = 'tryit';
    user.city = newCity;
    user.city = newCity;

    const checkDto = plainToClass(UserResponseDto, user);
    const errors = await validate(checkDto);

    expect(errors.length).toBe(0);
    expect(checkDto.city_id).toBe(newCity.id);
  });
});
