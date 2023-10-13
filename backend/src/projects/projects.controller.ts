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

import { ProjectsService } from './projects.service';

import createProjectDto from '../DTO/Projects/createProject.dto';
import ProjectsResponseDto from '../DTO/Projects/projectsResponse.dto';
import updateProjectDto from '../DTO/Projects/updateProjectDto.dto';

@ApiTags('Projects')
@Controller('/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getAll() {
    return this.projectsService.getProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id') id: number) {
    return await this.projectsService.getProjectById(id);
  }

  @Post('')
  async create(@Body() project: createProjectDto): Promise<createProjectDto> {
    return this.projectsService.post(project);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number): Promise<ProjectsResponseDto> {
    return this.projectsService.deleteById(id);
  }

  @Patch(':id')
  async updateProject(
    @Param('id') id: number,
    @Body() updateReq: updateProjectDto,
  ): Promise<updateProjectDto> {
    return await this.projectsService.patch(id, updateReq);
  }
}
