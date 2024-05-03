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
import { Users } from 'src/users/users.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private projectsRepository: Repository<Projects>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
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
    const { statusId, collaborators, ...updateFields } = updateReq;

    const project = await this.projectsRepository.findOne({
      where: { id: id },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    let isModified = false;

    if (statusId !== undefined && statusId !== null) {
      const status = await this.statusRepository.findOne({
        where: { id: statusId },
      });
      if (status) {
        project.status = status;
        isModified = true;
      }
    }

    if (collaborators !== undefined && collaborators !== null) {
      for (const collaboratorId of collaborators) {
        const collaborator = await this.usersRepository.findOne({
          where: { id: collaboratorId },
        });
        if (collaborator) {
          if (!project.collaborators) {
            project.collaborators = [];
          }
          project.collaborators.push(collaborator);
        }
      }
    }

    if (Object.keys(updateFields).length > 0) {
      Object.assign(project, updateFields);
      isModified = true;
    }

    if (isModified) {
      return this.projectsRepository.save(project);
    } else {
      return project;
    }
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
