import { Injectable, Body, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import JobResponseDto from 'src/DTO/Job/jobResponseDto.dto';
import { plainToClass } from 'class-transformer';

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

  // GetById
  async getJobById(id: number): Promise<JobResponseDto> {
    const job = await this.JobRepository.findOne({
      where: { id },
      relations: ['jobField'],
    });
    return plainToClass(JobResponseDto, job);
  }
}
