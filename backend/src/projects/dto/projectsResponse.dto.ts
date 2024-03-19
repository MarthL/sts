import { IsNotEmpty, IsInt } from 'class-validator';

export default class ProjectsResponseDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  project_name: string;

  @IsNotEmpty()
  description: string;
}