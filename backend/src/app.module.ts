import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth/auth.controller';

import { Projects } from './projects/projects.entity';
import { Users } from './users/users.entity';
import { Job } from './job/job.entity';
import { JobField } from './job-field/job-field.entity';
import { Clients } from './clients/clients.entity';

import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { JobModule } from './job/job.module';
import { PassportModule } from '@nestjs/passport';
import { JobFieldModule } from './job-field/job-field.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';

import { AuthService } from './auth/auth.service';
import { AuthLogin } from './auth/authlogin.service';

import { JwtStrategy } from './auth/jwt.strategy';
import { Company } from './companys/company.entity';
import { CompanyModule } from './companys/company.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '3h' }, // doesn't work
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      password: process.env.PASSWORD || null,
      username: process.env.USER,
      database: process.env.DBNAME,
      entities: [Projects, Users, Job, JobField, Clients, Company],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Projects, Users]),
    ProjectsModule,
    UsersModule,
    AuthModule,
    JobModule,
    JobFieldModule,
    ClientsModule,
    CompanyModule
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, AuthLogin],
  exports: [PassportModule, JwtModule],
})
export class AppModule {}
