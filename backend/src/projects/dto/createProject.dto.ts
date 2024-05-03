import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { Status } from 'src/status/status.entity';

export default class createProjectDto {
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
  @IsNumber()
  statusId: number;

  @IsOptional()
  project_picture: string;
}
