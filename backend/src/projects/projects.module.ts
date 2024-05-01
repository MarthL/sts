import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Projects } from './projects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from 'src/status/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Projects, Status])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService, TypeOrmModule.forFeature([Projects])],
})
export class ProjectsModule {}
