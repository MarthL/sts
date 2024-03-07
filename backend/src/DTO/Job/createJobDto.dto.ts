import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  job_title: string;

  @IsInt()
  job_field: number;
}