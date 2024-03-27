import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { StatusService } from './status.service';
import { UpdateStatusDto } from './dto/updateStatus.dto';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.statusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(+id, updateStatusDto);
  }

}