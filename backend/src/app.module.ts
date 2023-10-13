import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth/auth.controller';

import { Projects } from './projects/projects.entity';
import { Users } from './users/users.entity';
import { Job } from './job/job.entity';
import { JobField } from './job-field/job-field.entity';

import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth/auth.service';
import { AuthLogin } from './auth/authlogin.service';

import { JwtStrategy } from './auth/jwt.strategy';
import { JobFieldModule } from './job-field/job-field.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '3h' }, // doesn't work
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'sts',
      entities: [Projects, Users, Job],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Projects, Users]),
    ProjectsModule,
    UsersModule,
    AuthModule,
    JobModule,
    JobFieldModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, AuthLogin],
  exports: [PassportModule, JwtModule],
})
export class AppModule {}
