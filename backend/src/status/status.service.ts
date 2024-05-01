import { Injectable, HttpException, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './status.entity';
import { JobResponseDto } from 'src/job/dto/jobResponseDto.dto';
import { CreateJobDto } from 'src/job/dto/createJobDto.dto';
import { plainToClass } from 'class-transformer';
import { CreateStatusDto } from './dto/createStatusDto.dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private StatusRepository: Repository<Status>,
  ) {}

  // getAll
  async getAll(): Promise<Status[]> {
    return await this.StatusRepository.find();
  }

  // getById
  async getStatusById(id: number): Promise<Status> {
    const status = await this.StatusRepository.findOne({
      where: { id },
    });
    return status;
  }

  // post
  async createStatus(
    @Body() status: CreateStatusDto,
  ): Promise<CreateStatusDto> {
    const newStatus = plainToClass(CreateStatusDto, status);
    return await this.StatusRepository.save(newStatus);
  }
}
