import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { StatusService } from './status.service';
import { UpdateStatusDto } from './dto/updateStatus.dto';
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

  @Patch(':id')
  updateStatus(@Param('id') id: number, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.patchStatus(+id, updateStatusDto);
  }

}