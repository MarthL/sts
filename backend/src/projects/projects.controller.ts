import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
// import ProjectsResponseDto from './DTO/projectsResponse.dto'; // DTO
import createProjectDto from './DTO/createProject.dto';

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

  @Post('')
  @ApiResponse({ status: 201, description: 'Successfully post a new project' })
  async create(@Body() project: createProjectDto): Promise<any> {
    return this.projectsService.post(project);
  }
}
