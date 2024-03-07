import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class JobResponseDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  job_title: string;
}