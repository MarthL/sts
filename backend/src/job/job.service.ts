import { Injectable, Body, Param, Delete, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { JobResponseDto } from 'src/DTO/Job/jobResponseDto.dto';
import { CreateJobDto } from 'src/DTO/Job/createJobDto.dto';
import { plainToClass } from 'class-transformer';
import { JobField } from 'src/job-field/job-field.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private JobRepository: Repository<Job>,
  ) {}

  // getAll
  async getAll(): Promise<Job[]> {
    return await this.JobRepository.find();
  }

  // getById
  async getJobById(id: number): Promise<JobResponseDto> {
    const job = await this.JobRepository.findOne({
      where: { id },
      relations: ['jobField'],
    });
    return plainToClass(JobResponseDto, job);
  }

  // // postJob
  // async createJob(createJobDto: CreateJobDto): Promise<any> {
  //   const { job_title, job_field } = createJobDto;
  //   const jobFieldENtity = await this.JobFieldRepository.findOne({});
  //   this.JobRepository.save({ ...createJobDto });
  // }

  // deleteById
  async deleteById(id: number): Promise<any> {
    const existingJob = await this.JobRepository.findOne({
      where: {
        id: id,
      },
    });
    if (existingJob) {
      return await this.JobRepository.delete({ id: existingJob.id });
    } else {
      throw new HttpException('Job cannot be found', 404);
    }
  }
}
