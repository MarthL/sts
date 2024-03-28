import {
  Injectable,
  Body,
  Param,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Projects } from './projects.entity';
import ProjectsResponseDto from './dto/projectsResponse.dto';
import CreateProjectDto from './dto/createProject.dto';
import { updateProjectDto } from 'src/projects/dto/updateProjectDto.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private projectsRepository: Repository<Projects>,
  ) {}

  // GetAll
  async getProjects(search?: string): Promise<Projects[]> {
    if (!search) {
      return this.projectsRepository.find();
    }
    return await this.projectsRepository.find({
      select: {
        id: true,
        project_name: true,
        description: true
      },
      where: {
        project_name: Like(`${search}%`),
      },
    });
  }

  // GetById
  async getProjectById(
    @Param('id', ParseIntPipe) id: number ): Promise<ProjectsResponseDto | HttpException> {
    const project = await this.projectsRepository.findOne({
      where: { id },
    });
    if (!project) {
      throw new HttpException('Project not found', 404);
    }
    return plainToClass(ProjectsResponseDto, project);
  }

  // Post
  async post(
    @Body() createReq: CreateProjectDto): Promise<CreateProjectDto> {
    const newProject = plainToClass(CreateProjectDto, createReq);
    return await this.projectsRepository.save(newProject);
  }

  // Patch
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReq: updateProjectDto,
  ): Promise<any> {
    return this.projectsRepository.update(id, updateReq);
  }

  // Delete
  async deleteById(id: number): Promise<any> {
    return this.projectsRepository.delete(id);
  }
}