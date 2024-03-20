import { IsNotEmpty, IsInt, IsString, IsOptional } from 'class-validator';

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

  @IsOptional()
  client?: [];
}