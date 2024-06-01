import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { JobField } from './job-field.entity';

@Injectable()
export class JobFieldService {
  constructor(
    @InjectRepository(JobField)
    private jobFieldRepository: Repository<JobField>,
  ) {}

  async getAll(): Promise<JobField[]> {
    return await this.jobFieldRepository.find();
  }

  async getJobFieldById(id: number): Promise<JobField | HttpException> {
    const jobField = await this.jobFieldRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!jobField) {
      throw new HttpException('JobField not found', 404);
    } else {
      return jobField;
    }
  }

  async deleteById(id: number): Promise<DeleteResult> {
    return this.jobFieldRepository.delete(id);
  }

  async post(jobField: JobField): Promise<JobField> {
    return this.jobFieldRepository.save(jobField);
  }

  async update(id: number, jobField: JobField): Promise<UpdateResult> {
    return this.jobFieldRepository.update(id, jobField);
  }
}
