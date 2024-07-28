import { IsNotEmpty, IsInt, MaxLength, IsOptional } from 'class-validator';
import { JobField } from '../../job-field/job-field.entity';

export class CreateJobDto {
  @IsNotEmpty()
  @MaxLength(100)
  job_title: string;

  @IsOptional()
  @IsInt()
  job_field: number;
}
