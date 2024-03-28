import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { StatusService } from './status.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Status } from './status.entity';

@ApiTags('Status')
@Controller('/status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @ApiQuery({ name: 'search', required: false, type: String })
  async getAllStatus(@Query('search') search: string): Promise<Status[]> {
    return this.statusService.getStatus(search);
  }

  @Get(':id')
  async getOneStatus(@Param('id', ParseIntPipe) id: number) {
    return await this.statusService.getStatusById(id);
  }

}