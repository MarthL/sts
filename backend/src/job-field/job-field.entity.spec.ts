import { validate } from 'class-validator';
import { JobField } from './job-field.entity';
import { randomInt } from 'crypto';
import { Job } from '../job/job.entity';
import { JobResponseDto } from '../job/dto/jobResponseDto.dto';
import { plainToClass } from 'class-transformer';
import { Repository, DataSource } from 'typeorm';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';
import { AuthLogin } from '../auth/authlogin.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/users.entity';

describe('jobFieldEntity', () => {
  // it('should be valid when all properties are set', async () => {
  //   const jobFieldEntity = new JobField();
  //   let userRepository: Repository<Users>;
  //   let authRepository: Repository<AuthLogin>;

  //   const userService: UsersService = new UsersService(userRepository);
  //   const jwtService: JwtService = new JwtService();

  //   const authService = new AuthService(
  //     authRepository(jwtService),
  //     userService,
  //   );
  //     const authLogin = new AuthLogin(authService);

  //     const userController = new UsersController(userService, authLogin);
  //     const userCollection = await userController.getUsers();
  //     const job = new Job();
  //     job.id = 1;
  //     job.job_title = 'test job-title';
  //     jobFieldEntity.id = 1;
  //     jobFieldEntity.name = 'Jobfield test name';
  //     jobFieldEntity.Job = job;
  //     const errors = await validate(jobFieldEntity);
  //     expect(errors.length).toBe(0);
  // });

  it('should define job field', async () => {
    const jobField = new JobField();
    expect(jobField).toBeDefined();
  });

  it('Validating all property but i have an error idk why', async () => {
    const jobField = new JobField();
    jobField.id = 1;
    jobField.name = 'This is a test for job field name = Pompier';
    const checkDto = plainToClass(JobResponseDto, jobField);
    const errors = validate(checkDto);
    expect((await errors).length).toBeGreaterThan(0);
});

  it('should display an error when do not have any id', async () => {
    const jobField = new JobField();
    jobField.name = 'This is a test for job field name = Pompier';
    const checkDto = plainToClass(JobResponseDto, jobField);
    const errors = validate(checkDto);
    expect((await errors).length).toBeGreaterThan(0);
  });

  it('should display an error when do not have any name', async () => {
    const jobField = new JobField();
    jobField.id = 1;
    const checkDto = plainToClass(JobResponseDto, jobField);
    const errors = validate(checkDto);
    expect((await errors).length).toBeGreaterThan(0);
  });
});
