import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './status.entity';

@Injectable()
export class StatusSeederService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async seedInitialData(): Promise<any> {
    const statusNames = ['Open', 'Close', 'In Progress', 'In Waiting'];
    for (const statusName of statusNames) {
      const status = this.statusRepository.create({ statusName });
      await this.statusRepository.save(status);
    }
  }
}
