import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  job_title: string;

  @IsInt()
  job_field: number;
}
