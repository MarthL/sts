import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JobService } from './job.service';

@ApiTags('Job')
@Controller('/jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async getAll() {
    return this.jobService.getAll();
  }

  @Get(':id')
  async getJobById(@Param('id', ParseIntPipe) id: number) {
    return await this.jobService.getJobById(id);
  }
}
