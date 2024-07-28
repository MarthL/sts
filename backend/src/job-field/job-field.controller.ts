import {
  Controller,
  Body,
  Injectable,
  Get,
  Delete,
  Post,
  Patch,
  Param,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JobFieldService } from './job-field.service';

@ApiTags('JobField')
@Controller('/job-field')
@Injectable()
export class JobFieldController {
  constructor(private readonly jobFieldService: JobFieldService) {}

  @Get()
  async getAll() {
    return this.jobFieldService.getAll();
  }

  @Delete(':id')
  async deleteById(id: number) {
    return this.jobFieldService.deleteById(id);
  }

  @Post()
  async post(@Body() jobField: any): Promise<any> {
    return this.jobFieldService.post(jobField);
  }

  @Patch(':id')
  async update(
    @Body() req: any,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return this.jobFieldService.update(id, req);
  }
}
