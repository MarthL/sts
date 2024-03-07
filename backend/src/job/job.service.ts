import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { JobResponseDto } from '../DTO/Job/jobResponseDto.dto';
import { CreateJobDto } from '../DTO/Job/createJobDto.dto';
import { JobField } from '../job-field/job-field.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private JobRepository: Repository<Job>,
    @InjectRepository(JobField)
    private JobFieldRepository: Repository<JobField>,
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

  // post
  async createJob(createJobDto: CreateJobDto): Promise<any> {
    const { job_title, job_field } = createJobDto;

    let jobFieldEntity: JobField | undefined;
    if (job_field) {
      jobFieldEntity = await this.JobFieldRepository.findOne({
        where: { id: job_field },
      });
    }

    const newJob = new Job();
    newJob.job_title = job_title;

    if (jobFieldEntity) {
      newJob.jobField = jobFieldEntity;
    }

    const savedJob = await this.JobRepository.save(newJob);

    return savedJob;
  }

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