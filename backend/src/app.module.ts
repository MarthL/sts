import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';

import { Projects } from './projects/projects.entity';
import { Users } from './users/users.entity';
import { Job } from './job/job.entity';
import { JobField } from './job-field/job-field.entity';
import { Clients } from './clients/clients.entity';
import { Companys } from './companys/company.entity';
import { Citys } from './citys/citys.entity';
import { Links } from './links/links.entity';

import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { JobModule } from './job/job.module';
import { LinksModule } from './links/links.module';
import { CompanysModule } from './companys/company.module';
import { JobFieldModule } from './job-field/job-field.module';
import { ClientsModule } from './clients/clients.module';
import { CitysModule } from './citys/citys.module';

import { AuthService } from './auth/auth.service';
import { AuthLogin } from './auth/authlogin.service';

import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

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
      username: process.env.DBUSERNAME,
      database: process.env.DBNAME,
      entities: [Projects, Users, Job, JobField, Clients, Companys, Citys, Links],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Projects, Users]),
    ProjectsModule,
    UsersModule,
    AuthModule,
    JobModule,
    JobFieldModule,
    ClientsModule,
    CompanysModule,
    CitysModule,
    LinksModule
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, AuthLogin],
  exports: [PassportModule, JwtModule],
})
export class AppModule {}