import {
  Injectable,
  Body,
  Param,
  HttpException,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Projects } from './projects.entity';
import ProjectsResponseDto from './dto/projectsResponse.dto';
import CreateProjectDto from './dto/createProject.dto';
import { updateProjectDto } from 'src/projects/dto/updateProjectDto.dto';
import { plainToClass } from 'class-transformer';
import { Status } from 'src/status/status.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private projectsRepository: Repository<Projects>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
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
        description: true,
      },
      where: {
        project_name: Like(`${search}%`),
      },
    });
  }

  // GetById
  async getProjectById(
    id: number,
  ): Promise<ProjectsResponseDto | HttpException> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!project) {
      throw new HttpException('Project not found', 404);
    }
    return plainToClass(ProjectsResponseDto, project);
  }

  // Post
  async post(@Body() createReq: CreateProjectDto): Promise<CreateProjectDto> {
    const newProject = plainToClass(CreateProjectDto, createReq);
    return await this.projectsRepository.save(newProject);
  }

  // Patch
  async patch(id: number, updateReq: updateProjectDto): Promise<any> {
    const { statusId, ...updateFields } = updateReq;

    const project = await this.projectsRepository.findOne({
      where: { id: id },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    if (statusId !== undefined) {
      const status = await this.statusRepository.findOne({
        where: { id: statusId },
      });
      if (status) {
        project.status = status;
      }
    }

    Object.assign(project, updateFields);

    return this.projectsRepository.save(project);
  }

  // Delete
  async deleteById(id: number): Promise<ProjectsResponseDto> {
    const project = await this.projectsRepository.findOne({
      where: { id },
    });
    if (!project) {
      throw new HttpException('Project not found', 404);
    }
    await this.projectsRepository.delete(id);
    return plainToClass(ProjectsResponseDto, project);
  }
}
