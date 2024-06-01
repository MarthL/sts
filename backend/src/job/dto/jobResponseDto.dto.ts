import { IsNotEmpty, MaxLength, IsOptional, IsInt } from 'class-validator';
import { JobField } from '../../job-field/job-field.entity';

export class JobResponseDto {
  @IsNotEmpty()
  @MaxLength(100)
  id: number;

  @IsNotEmpty()
  job_title: string;

  @IsOptional()
  jobField: JobField;
}
