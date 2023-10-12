import { Injectable, Body, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from './projects.entity';
import ProjectsResponseDto from '../DTO/Projects/projectsResponse.dto';
import CreateProjectDto from '../DTO/Projects/createProject.dto';

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
  async getProjectById(id: number): Promise<ProjectsResponseDto | null> {
    return await this.projectsRepository.findOne({
      where: { id },
    });
  }

  // Post
  async post(@Body() createReq: CreateProjectDto): Promise<CreateProjectDto> {
    return await this.projectsRepository.save(createReq);
  }

  // Patch
  async patch(
    @Param('id') id: number,
    @Body() updateReq: ProjectsResponseDto,
  ): Promise<any> {
    return this.projectsRepository.update(id, updateReq);
  }

  async deleteById(id: number): Promise<any> {
    return this.projectsRepository.delete(id);
  }
}
