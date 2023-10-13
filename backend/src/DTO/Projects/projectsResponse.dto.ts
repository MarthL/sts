import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export default class ProjectsResponseDto {
  @Exclude()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  project_name: string;

  @IsNotEmpty()
  description: string;
}
