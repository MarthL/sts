import { Controller, Get, Param } from '@nestjs/common';
import { StatusService } from './status.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  getAllStatus() {
    return this.statusService.getStatus();
  }

  @Get(':id')
  getOneStatus(@Param('id') id: number) {
    return this.statusService.getStatusById(+id);
  }

}