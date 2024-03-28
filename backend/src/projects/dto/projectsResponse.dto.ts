import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { Status } from 'src/status/status.entity';
import { Column } from 'typeorm';

export default class ProjectsResponseDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  project_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @Column()
  status: Status;
}