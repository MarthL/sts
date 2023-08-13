import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import ProjectsResponseDto from './DTO/projectsResponse.dto'; // DTO

@ApiTags('Projects')
@Controller('/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @Get()
  @ApiResponse({ status: 200, description: 'Successfully get all the datas' })
  async getAll() {
    return this.projectsService.getProjects();
  }
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Successfully get one project by id',
  })
  async getProjectById(@Param('id') id: number) {
    return await this.projectsService.getProjectById(id);
  }
}
