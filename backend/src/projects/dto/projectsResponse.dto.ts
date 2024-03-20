import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export default class ProjectsResponseDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  project_name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  clients?: string;
}