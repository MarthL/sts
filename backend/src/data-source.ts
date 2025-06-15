import { DataSource } from 'typeorm';
import { Projects } from './projects/projects.entity';
import { Users } from './users/users.entity';
import { Job } from './job/job.entity';
import { JobField } from './job-field/job-field.entity';
import { Clients } from './clients/clients.entity';
import { Citys } from './citys/citys.entity';
import { Companys } from './companys/company.entity';
import { Status } from './status/status.entity';
import { MainSeeder } from './seeding/main.seeder';

import 'dotenv/config';

import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.HOST,
  port: parseInt(process.env.PORT),
  password: process.env.PASSWORD || null,
  username: process.env.DBUSERNAME,
  database: process.env.DBNAME,
  synchronize: true,
  entities: [Projects, Users, Job, JobField, Clients, Citys, Companys, Status],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);
