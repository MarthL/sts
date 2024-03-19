import { IsNotEmpty, IsInt, MaxLength, IsString } from 'class-validator';

export default class ProjectsResponseDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  project_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}