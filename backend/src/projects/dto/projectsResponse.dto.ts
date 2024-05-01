import {
  IsNotEmpty,
  IsNumber,
  IsInt,
  MaxLength,
  IsString,
  IsOptional,
} from 'class-validator';
import { Status } from 'src/status/status.entity';

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

  @IsOptional()
  @IsNumber()
  company_id: number;

  @IsOptional()
  status: Status;
}
