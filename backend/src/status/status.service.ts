import { Injectable } from '@nestjs/common';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class StatusService {

  findAll() {
    return `This action returns all status`;
  }

  findOne(id: number) {
    return `This action returns a #${id} status`;
  }

  update(id: number, updateStatusDto: UpdateStatusDto) {
    return `This action updates a #${id} status`;
  }

}