import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  ParseIntPipe,
  Injectable,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JobService } from './job.service';
import { CreateJobDto } from '../DTO/Job/createJobDto.dto';

@ApiTags('Job')
@Controller('/jobs')
@Injectable()
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

  @Post('')
  async postJob(@Body() createJobDto: CreateJobDto) {
    const newJob = await this.jobService.createJob(createJobDto);
    return { newJob };
  }

  @Delete(':id')
  async deleteJob(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.jobService.deleteById(id);
  }
}