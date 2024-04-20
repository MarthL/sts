import { IsNotEmpty, IsInt, IsString, MaxLength } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  job_title: string;

  @IsInt()
  job_field: number;
}