import { Controller, Get } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';

@Controller('/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @Get()
  // @ApiOkResponse({ type: ProjectResponseDto })
  // @HttpCode(200)
  async getAll() {
    return this.projectsService.getProjects();
  }
}
