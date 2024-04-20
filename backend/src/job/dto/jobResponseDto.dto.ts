import { IsInt, IsNotEmpty, IsString, MaxLength  } from 'class-validator';

export class JobResponseDto {
  @IsNotEmpty()
  @IsInt()
  @MaxLength(100)
  id: number;

  @IsNotEmpty()
  @IsString()
  job_title: string;
}