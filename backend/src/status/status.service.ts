import { Body, HttpException, Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Status } from './status.entity';
import { StatusResponseDto } from './dto/statusResponse.dto';
import { UpdateStatusDto } from './dto/updateStatus.dto';

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

  // Patch
  async patchStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReq: UpdateStatusDto,
  ): Promise<any> {
    return this.statusRepository.update(id, updateReq);
  }

}