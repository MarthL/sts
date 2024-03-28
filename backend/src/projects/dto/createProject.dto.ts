import { IsNotEmpty, IsString } from 'class-validator';
import { Status } from 'src/status/status.entity';
import { Column } from 'typeorm';

export default class createProjectDto {
  @IsNotEmpty()
  @IsString()
  project_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @Column()
  status: Status;
}