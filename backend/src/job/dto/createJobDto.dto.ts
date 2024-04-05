import { IsNotEmpty, IsInt, MaxLength } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  @MaxLength(100)
  job_title: string;

  @IsInt()
  job_field: number;
}
