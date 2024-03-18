import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { Projects } from 'src/projects/projects.entity';

export default class CreateClientsDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsString()
  @IsNotEmpty()
  siret!: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsString()
  @IsNotEmpty()
  mail!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsOptional()
  adress?: string;

  @IsString()
  @IsOptional()
  zip_code?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  projects?: Projects;
}