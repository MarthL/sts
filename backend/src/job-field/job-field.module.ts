import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobField } from './job-field.entity';
import { JobFieldService } from './job-field.service';
import { JobFieldController } from './job-field.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JobField])],
  controllers: [JobFieldController],
  providers: [JobFieldService],
  exports: [JobFieldService, TypeOrmModule.forFeature([JobField])],
})
export class JobFieldModule {}
