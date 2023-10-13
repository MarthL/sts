import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JobService } from './job.service';

@ApiTags('Projects')
@Controller('/job')
export class JobController {
  constructor(private readonly jobService: JobService) {}
}
