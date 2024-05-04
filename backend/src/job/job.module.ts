import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { Job } from './job.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobFieldModule } from '../job-field/job-field.module';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), JobFieldModule],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
