import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthLogin } from './auth/authlogin.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Projects } from './projects/projects.entity';
import { Users } from './users/users.entity';
import { Job } from './job/job.entity';
import { JobField } from './job-field/job-field.entity';
import { Clients } from './clients/clients.entity';
import { Citys } from './citys/citys.entity';
import { Companys } from './companys/company.entity';
import { Status } from './status/status.entity';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(Projects))
      .useValue({
        // Fournir une implémentation factice pour le repository si nécessaire
      })
      .overrideProvider(getRepositoryToken(Users))
      .useValue({
        // Fournir une implémentation factice pour le repository si nécessaire
      })
      // Faire de même pour les autres entités
      .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide the auth service', () => {
    const service = module.get<AuthService>(AuthService);
    expect(service).toBeDefined();
  });

  it('should provide the auth login service', () => {
    const service = module.get<AuthLogin>(AuthLogin);
    expect(service).toBeDefined();
  });

  it('should provide the jwt strategy', () => {
    const strategy = module.get<JwtStrategy>(JwtStrategy);
    expect(strategy).toBeDefined();
  });

  it('should provide the auth controller', () => {
    const controller = module.get<AuthController>(AuthController);
    expect(controller).toBeDefined();
  });
});
