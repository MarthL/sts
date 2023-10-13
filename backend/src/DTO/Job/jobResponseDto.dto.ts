import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export default class JobResponseDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  job_title: string;
}
