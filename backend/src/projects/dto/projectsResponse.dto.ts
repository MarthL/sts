import {
  IsNotEmpty,
  IsNumber,
  IsInt,
  MaxLength,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Status } from '../../status/status.entity';
import { Users } from '../../users/users.entity';

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

  @IsString()
  @IsOptional()
  progress: string;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  sendDate: Date;

  @IsOptional()
  budget: number;

  @IsOptional()
  @IsNumber()
  company_id: number;

  @IsOptional()
  status: Status;

  @IsArray()
  @IsOptional()
  collaborators: Users[];
}
