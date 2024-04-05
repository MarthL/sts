import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export default class createProjectDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  project_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}