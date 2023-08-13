import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from './projects.entity';
import ProjectsResponseDto from './DTO/projectsResponse.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private projectsRepository: Repository<Projects>,
  ) {}

  async getProjects(): Promise<Projects[]> {
    return await this.projectsRepository.find();
  }

  async getProjectById(id: number): Promise<ProjectsResponseDto> {
    return await this.projectsRepository.findOne({
      where: { id },
    });
  }
}
