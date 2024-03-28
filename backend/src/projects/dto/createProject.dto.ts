import { IsNotEmpty, IsString } from 'class-validator';

export default class createProjectDto {
  @IsNotEmpty()
  @IsString()
  project_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}