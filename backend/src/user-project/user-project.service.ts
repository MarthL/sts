import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProject } from './user-project.entity';
import { Users } from '../users/users.entity';
import { Projects } from '../projects/projects.entity';

@Injectable()
export class UserProjectService {
  constructor(
    @InjectRepository(UserProject)
    private readonly userProjectRepository: Repository<UserProject>,
  ) {}

  async assignUserToProject(
    user: Users,
    project: Projects,
    occupation_rate: number,
  ): Promise<UserProject> {
    const existing = await this.userProjectRepository.findOne({
      where: { user: { id: user.id }, project: { id: project.id } },
    });

    if (existing) {
      existing.occupation_rate = occupation_rate;
      return this.userProjectRepository.save(existing);
    }

    const assignment = this.userProjectRepository.create({
      user,
      project,
      occupation_rate,
    });

    return this.userProjectRepository.save(assignment);
  }

  async getProjectsForUser(userId: number): Promise<UserProject[]> {
    return this.userProjectRepository.find({
      where: { user: { id: userId } },
      relations: ['project'],
    });
  }

  async getUsersForProject(projectId: number): Promise<UserProject[]> {
    return this.userProjectRepository.find({
      where: { project: { id: projectId } },
      relations: ['user'],
    });
  }

  async unassignUserFromProject(
    userId: number,
    projectId: number,
  ): Promise<void> {
    await this.userProjectRepository.delete({
      user: { id: userId },
      project: { id: projectId },
    });
  }

  async updateOccupationRate(
    userId: number,
    projectId: number,
    rate: number,
  ): Promise<UserProject> {
    const relation = await this.userProjectRepository.findOne({
      where: {
        user: { id: userId },
        project: { id: projectId },
      },
    });

    if (!relation) throw new Error('Relation not found');

    relation.occupation_rate = rate;
    return this.userProjectRepository.save(relation);
  }
}
