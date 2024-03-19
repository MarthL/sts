import { IsNotEmpty } from 'class-validator';

export default class createProjectDto {
  @IsNotEmpty()
  project_name: string;

  @IsNotEmpty()
  description: string;
}
