import {
  Controller,
  Get,
  Post,
  Query,
  Patch,
  Param,
  Delete,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { Projects } from './projects.entity';
import createProjectDto from './dto/createProject.dto';
import ProjectsResponseDto from './dto/projectsResponse.dto';
import { updateProjectDto } from './dto/updateProjectDto.dto';
import { HttpException } from '@nestjs/common';

@ApiTags('Projects')
@Controller('/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiQuery({ name: 'search', required: false, type: String })
  async getAll(@Query('search') search: string): Promise<Projects[]> {
    return this.projectsService.getProjects(search);
  }

  @Get(':id')
  async getProjectById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProjectsResponseDto | HttpException> {
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
    console.log(updateProjectDto);
    return await this.projectsService.patch(id, updateReq);
  }
}
