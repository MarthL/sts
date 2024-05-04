import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Projects } from './projects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from '../status/status.entity';
import { Users } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Projects, Status, Users])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService, TypeOrmModule.forFeature([Projects])],
})
export class ProjectsModule {}
