import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { Projects } from './projects.entity';
import createProjectDto from './dto/createProject.dto';
import ProjectsResponseDto from './dto/projectsResponse.dto';
import { updateProjectDto } from './dto/updateProjectDto.dto';

@ApiTags('Projects')
@Controller('/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getAll(): Promise<Projects[]> {
    return this.projectsService.getProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id', ParseIntPipe) id: number) {
    return await this.projectsService.getProjectById(id);
  }

  @Post('')
  async create(@Body() project: createProjectDto): Promise<createProjectDto> {
    return this.projectsService.post(project);
  }

  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProjectsResponseDto> {
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
