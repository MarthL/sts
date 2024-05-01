import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { Status } from './status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobFieldModule } from 'src/job-field/job-field.module';

@Module({
  imports: [TypeOrmModule.forFeature([Status]), JobFieldModule],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
