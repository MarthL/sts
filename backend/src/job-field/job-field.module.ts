import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobField } from './job-field.entity';
import { JobFieldService } from './job-field.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobField])],
  providers: [JobFieldService],
  exports: [JobFieldService, TypeOrmModule.forFeature([JobField])],
})
export class JobFieldModule {}