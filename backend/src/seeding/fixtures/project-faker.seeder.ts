import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Projects } from 'src/projects/projects.entity';
import { Users } from 'src/users/users.entity';
import { Status } from 'src/status/status.entity';
import { faker } from '@faker-js/faker';

export default class ProjectsFakerSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const projectRepository = dataSource.getRepository(Projects);
    const userRepository = dataSource.getRepository(Users);
    const statusRepository = dataSource.getRepository(Status);

    const statuses = await statusRepository.find();
    const users = await userRepository.find();
    const projects = await projectRepository.find({
      relations: ['collaborators', 'status'],
    });

    for (const project of projects) {
      if (!project.status) {
        const randomStatus = faker.helpers.arrayElement(statuses);
        project.status = randomStatus;
      }
      project.startDate = project.startDate || faker.date.past();
      project.endDate = project.endDate || faker.date.future();
      project.budget =
        project.budget ||
        parseFloat(faker.finance.amount({ min: 10000, max: 100000, dec: 2 }));
      project.photo_url =
        project.photo_url ||
        faker.image.urlPicsumPhotos({ width: 600, height: 400 });
      project.progress =
        project.progress ||
        parseFloat(faker.number.float({ min: 0, max: 100 }).toFixed(2));

      if (!project.collaborators || project.collaborators.length === 0) {
        const randomUsers = faker.helpers.arrayElements(
          users,
          faker.number.int({ min: 1, max: 3 }),
        );
        project.collaborators = randomUsers;
      }

      await projectRepository.save(project);
    }

    console.log(`✅ Projects faker seed completed`);
  }
}
