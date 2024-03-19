import { IsNotEmpty, MaxLength } from 'class-validator';

export class JobResponseDto {
  @IsNotEmpty()
  @MaxLength(100)
  id: number;

  @IsNotEmpty()
  job_title: string;
}
