import { validate } from 'class-validator';
import { JobField } from './job-field.entity';
import { randomInt } from 'crypto';
import { Job } from 'src/job/job.entity';
import { Repository, DataSource } from 'typeorm';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { AuthLogin } from 'src/auth/authlogin.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.entity';

describe('jobFieldEntity', () => {
  it('should be valid when all properties are set', async () => {
    const jobFieldEntity = new JobField();
    // let userRepository: Repository<Users> = ;
    let authRepository: Repository<AuthLogin>;

    // const userService: UsersService = new UsersService(userRepository);
    const jwtService: JwtService = new JwtService();

    // const authService = new AuthService(
    //   authRepository(jwtService),
    //   userService,
    // );
    //   const authLogin = new AuthLogin(authService);

    //   const userController = new UsersController(userService, authLogin);
    //   const userCollection = await userController.getUsers();
    //   const job = new Job();
    //   job.id = 1;
    //   job.job_title = 'test job-title';
    //   jobFieldEntity.id = 1;
    //   jobFieldEntity.name = 'Jobfield test name';
    //   jobFieldEntity.Job = job;
    //   const errors = await validate(jobFieldEntity);
    //   expect(errors.length).toBe(0);
  });
});
