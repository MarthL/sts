import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
// import ProjectsResponseDto from './DTO/projectsResponse.dto'; // DTO
import createProjectDto from '../DTO/Projects/createProject.dto';
import ProjectsResponseDto from '../DTO/Projects/projectsResponse.dto';
import updateProjectDto from '../DTO/Projects/updateProjectDto.dto';
import { JwtAuthGuard } from './../auth/jwt.auth.guard';

@ApiTags('Projects')
@Controller('/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
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
