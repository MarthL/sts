import { Module } from '@nestjs/common';
import { JobFieldService } from './job-field.service';
import { JobFieldController } from './job-field.controller';

@Module({
  providers: [JobFieldService],
  controllers: [JobFieldController]
})
export class JobFieldModule {}
