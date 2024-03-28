import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, DataSource } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Status } from './status.entity';
import { StatusResponseDto } from './dto/statusResponse.dto';
//import { statusValue } from './statusValue';

const statusOpen = new Status();
statusOpen.statusName = "Open"
console.log('status Open : ', statusOpen)

const statusClose = new Status();
statusClose.statusName = "Close"
console.log('status Close : ', statusClose)

const statusInProgress = new Status();
statusInProgress.statusName = "In Progress"
console.log('status InProgress : ', statusInProgress)

const statusInWaiting = new Status();
statusInWaiting.statusName = "In Waiting"
console.log('status InWaiting : ', statusInWaiting)


@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  // GetAll
  async getStatus(search?: string): Promise<Status[]> {
    if (!search) {
      return this.statusRepository.find();
    }
    return await this.statusRepository.find({
      select: {
        id: true,
        statusName: true
      },
      where: {
        statusName: Like(`${search}%`)
      }
    });
  }

  // GetById
  async getStatusById(id: number): Promise<StatusResponseDto | HttpException> {
    const status = await this.statusRepository.findOne({
      where: { id },
    });
    if (!status) {
      throw new HttpException('status not found', 404);
    }
    return plainToClass(StatusResponseDto, status);
  }

}