export class JobService {}
import { Injectable, Body, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Job)
    private JobRepository: Repository<Job>,
  ) {}

  // getAll
  async getAll(): Promise<Job[]> {
    return await this.JobRepository.find();
  }

  // GetById
  async getJobById(id: number): Promise<any> {
    return await this.JobRepository.findOne({
      where: { id },
    });
  }
}
