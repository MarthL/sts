import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  ParseIntPipe,
  Injectable,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/createStatusDto.dto';

@ApiTags('Status')
@Controller('status')
@Injectable()
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  async getAll() {
    return this.statusService.getAll();
  }

  @Get(':id')
  async getStatusById(@Param('id', ParseIntPipe) id: number) {
    return await this.statusService.getStatusById(id);
  }

  @Post('')
  async create(@Body() status: CreateStatusDto): Promise<CreateStatusDto> {
    return this.statusService.createStatus(status);
  }
}
