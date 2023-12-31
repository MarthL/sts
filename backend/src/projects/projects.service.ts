import {
  Injectable,
  Body,
  Param,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from './projects.entity';
import ProjectsResponseDto from '../DTO/Projects/projectsResponse.dto';
import CreateProjectDto from '../DTO/Projects/createProject.dto';
import { updateProjectDto } from 'src/DTO/Projects/updateProjectDto.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private projectsRepository: Repository<Projects>,
  ) {}

  // GetAll
  async getProjects(): Promise<Projects[]> {
    return await this.projectsRepository.find();
  }

  // GetById
  async getProjectById(
    id: number,
  ): Promise<ProjectsResponseDto | HttpException> {
    const project = await this.projectsRepository.findOne({
      where: { id },
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
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReq: updateProjectDto,
  ): Promise<any> {
    return this.projectsRepository.update(id, updateReq);
  }

  async deleteById(id: number): Promise<any> {
    return this.projectsRepository.delete(id);
  }
}
