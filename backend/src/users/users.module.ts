import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';

import { UsersService } from './users.service';

import { Users } from './users.entity';

import { AuthModule } from '../auth/auth.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { AuthLogin } from '../auth/authlogin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    ProjectsModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthLogin],
  exports: [UsersService],
})
export class UsersModule {}
